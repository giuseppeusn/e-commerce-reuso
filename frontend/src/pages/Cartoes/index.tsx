// import { useEffect, useId, useState, type ChangeEvent } from "react";
// import Navbar from "../Componentes/NavBar";

// /* =========================================================================
//  * BIN lookup (API + utilitários)
//  * ========================================================================= */

// interface BinInfo {
//     scheme: string;
//     type: string;
//     issuer: string;
//     country?: string;
// }

// type Provider = (bin: string, signal: AbortSignal) => Promise<BinInfo | null>;

// async function fromHandyApi(bin: string, signal: AbortSignal): Promise<BinInfo | null> {
//     const res = await fetch(`https://data.handyapi.com/bin/${bin}`, { signal });
//     const data = await res.json();
//     // BIN desconhecido volta como HTTP 200 + { Status: "NOT FOUND" }
//     if (!res.ok || data.Status !== "SUCCESS") return null;
//     return {
//         scheme: data.Scheme,
//         type: data.Type,
//         issuer: data.Issuer,
//         country: data.Country?.A2,
//     };
// }

// async function fromBinlist(bin: string, signal: AbortSignal): Promise<BinInfo | null> {
//     const res = await fetch(`https://lookup.binlist.net/${bin}`, {
//         signal,
//         headers: { "Accept-Version": "3" },
//     });
//     if (res.status === 404) return null;
//     if (!res.ok) throw new Error(`binlist ${res.status}`); // 429 = limite estourado
//     const data = await res.json();
//     return {
//         scheme: data.scheme?.toUpperCase(),
//         type: data.type?.toUpperCase(),
//         issuer: data.bank?.name,
//         country: data.country?.alpha2,
//     };
// }

// // Ordem de tentativa: se um falhar (ou não achar o BIN), tenta o próximo.
// const providers: Provider[] = [fromHandyApi, fromBinlist];

// const cache = new Map<string, BinInfo | null>();

// /**
//  * - Retorna BinInfo se algum provedor achou.
//  * - Retorna null se algum provedor respondeu "não encontrado" e nenhum achou.
//  * - Lança erro se todos falharam (rede, CORS, limite).
//  */
// async function lookupBin(bin: string, signal: AbortSignal): Promise<BinInfo | null> {
//     if (cache.has(bin)) return cache.get(bin) ?? null;

//     let answeredNotFound = false;

//     for (const provider of providers) {
//         try {
//             const result = await provider(bin, signal);
//             if (result) {
//                 cache.set(bin, result);
//                 return result;
//             }
//             answeredNotFound = true;
//         } catch (err) {
//             if (signal.aborted) throw err; // cancelada de propósito
//             // falhou: tenta o próximo provedor
//         }
//     }

//     if (answeredNotFound) {
//         cache.set(bin, null);
//         return null;
//     }
//     throw new Error("Nenhum provedor de BIN respondeu");
// }

// const onlyDigits = (value: string) => value.replace(/\D/g, "");

// const titleCase = (s: string) =>
//     s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

// /** Formata em grupos: 4-4-4-4 (ou 4-6-5 para Amex). */
// function formatCardNumber(value: string): string {
//     const digits = onlyDigits(value).slice(0, 19);
//     if (/^3[47]/.test(digits)) {
//         return [digits.slice(0, 4), digits.slice(4, 10), digits.slice(10, 15)]
//             .filter(Boolean)
//             .join(" ");
//     }
//     return digits.replace(/(.{4})/g, "$1 ").trim();
// }

// /** Validação de Luhn (detecta erro de digitação). */
// function isValidLuhn(value: string): boolean {
//     const digits = onlyDigits(value);
//     if (digits.length < 12) return false;
//     let sum = 0;
//     let double = false;
//     for (let i = digits.length - 1; i >= 0; i--) {
//         let n = Number(digits[i]);
//         if (double) {
//             n *= 2;
//             if (n > 9) n -= 9;
//         }
//         sum += n;
//         double = !double;
//     }
//     return sum % 10 === 0;
// }

// /** Bandeira detectada localmente, sem rede (feedback instantâneo). */
// function detectScheme(value: string): string | null {
//     const digits = onlyDigits(value);
//     if (/^4/.test(digits)) return "VISA";
//     if (/^3[47]/.test(digits)) return "AMEX";
//     if (/^5[1-5]/.test(digits)) return "MASTERCARD";
//     if (digits.length >= 4) {
//         const p4 = Number(digits.slice(0, 4));
//         if (p4 >= 2221 && p4 <= 2720) return "MASTERCARD";
//     }
//     return null;
// }

// /* =========================================================================
//  * Hook
//  * ========================================================================= */

// type BinStatus = "idle" | "loading" | "success" | "not_found" | "error";

// function useBinLookup(cardNumber: string, debounceMs = 400) {
//     const [info, setInfo] = useState<BinInfo | null>(null);
//     const [status, setStatus] = useState<BinStatus>("idle");

//     // Só os 8 primeiros dígitos importam; digitar o resto não dispara nova consulta.
//     const bin = onlyDigits(cardNumber).slice(0, 8);
//     const ready = bin.length >= 6;

//     useEffect(() => {
//         if (!ready) {
//             setInfo(null);
//             setStatus("idle");
//             return;
//         }

//         const controller = new AbortController();
//         setStatus("loading");

//         const timer = setTimeout(async () => {
//             try {
//                 const result = await lookupBin(bin, controller.signal);
//                 setInfo(result);
//                 setStatus(result ? "success" : "not_found");
//             } catch {
//                 if (controller.signal.aborted) return; // usuário continuou digitando
//                 setInfo(null);
//                 setStatus("error");
//             }
//         }, debounceMs);

//         return () => {
//             clearTimeout(timer);
//             controller.abort();
//         };
//     }, [bin, ready, debounceMs]);

//     return { info, status };
// }

// /* =========================================================================
//  * Campo de número do cartão
//  * ========================================================================= */

// const TYPE_LABEL: Record<string, string> = {
//     CREDIT: "Crédito",
//     DEBIT: "Débito",
// };

// const SCHEME_LABEL: Record<string, string> = {
//     VISA: "Visa",
//     MASTERCARD: "Mastercard",
//     AMEX: "American Express",
// };

// interface CardNumberFieldProps {
//     value: string;
//     onChange: (value: string) => void;
//     info: BinInfo | null;
//     status: BinStatus;
// }

// function CardNumberField({ value, onChange, info, status }: CardNumberFieldProps) {
//     const id = useId();

//     const localScheme = detectScheme(value);
//     const scheme = info?.scheme?.toUpperCase() ?? localScheme;
//     const schemeText = scheme ? (SCHEME_LABEL[scheme] ?? titleCase(scheme)) : null;
//     const invalid = onlyDigits(value).length >= 13 && !isValidLuhn(value);

//     function handleChange(e: ChangeEvent<HTMLInputElement>) {
//         onChange(formatCardNumber(e.target.value));
//     }

//     return (
//         <div className="flex w-full flex-col gap-1.5">
//             <label htmlFor={id} className="text-sm font-medium text-gray-900">
//                 Número do cartão
//             </label>

//             <div className="relative">
//                 <input
//                     id={id}
//                     value={value}
//                     onChange={handleChange}
//                     inputMode="numeric"
//                     autoComplete="cc-number"
//                     placeholder="0000 0000 0000 0000"
//                     aria-invalid={invalid}
//                     aria-describedby={`${id}-hint`}
//                     className={`w-full rounded-md border bg-white px-3 py-2 pr-28 text-base tabular-nums outline-none focus:ring-2 ${
//                         invalid
//                             ? "border-red-500 focus:ring-red-200"
//                             : "border-gray-300 focus:border-gray-500 focus:ring-gray-200"
//                     }`}
//                 />
//                 {schemeText && (
//                     <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600">
//                         {schemeText}
//                     </span>
//                 )}
//             </div>

//             <p id={`${id}-hint`} aria-live="polite" className="min-h-5 text-sm">
//                 {invalid ? (
//                     <span className="text-red-600">Confira o número: algum dígito parece errado.</span>
//                 ) : status === "loading" ? (
//                     <span className="text-gray-500">Consultando banco emissor…</span>
//                 ) : status === "success" && info ? (
//                     <span className="text-gray-700">
//                         <strong className="font-medium">
//                             {info.issuer ? titleCase(info.issuer) : "Banco não informado"}
//                         </strong>
//                         {info.type && ` – ${TYPE_LABEL[info.type.toUpperCase()] ?? titleCase(info.type)}`}
//                         {info.country && info.country !== "BR" && ` (${info.country})`}
//                     </span>
//                 ) : status === "not_found" ? (
//                     <span className="text-gray-500">Banco emissor não identificado.</span>
//                 ) : status === "error" ? (
//                     <span className="text-gray-500">
//                         Não foi possível consultar o banco emissor agora. Você pode continuar.
//                     </span>
//                 ) : null}
//             </p>
//         </div>
//     );
// }

// /* =========================================================================
//  * Página
//  * ========================================================================= */

// const inputClass =
//     "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200";

// const Index = () => {
//     const [nome, setNome] = useState<string>("");
//     const [conta, setConta] = useState<string>("");
//     const [agencia, setAgencia] = useState<string>("");
//     const [banco, setBanco] = useState<string>("");
//     const [cartao, setCartao] = useState<string>("");

//     const { info, status } = useBinLookup(cartao);

//     // Preenche o banco com o emissor encontrado, sem sobrescrever o que o usuário já digitou.
//     useEffect(() => {
//         if (info?.issuer) setBanco((prev) => prev || titleCase(info.issuer));
//     }, [info]);

//     return (
//         <div className="min-h-screen bg-reuso-canvas p-8">
//             <Navbar />

//             <div className="mx-auto mt-8 flex max-w-sm flex-col gap-4">
//                 <div className="flex flex-col gap-1.5">
//                     <label htmlFor="nome" className="text-sm font-medium text-gray-900">
//                         Nome
//                     </label>
//                     <input
//                         id="nome"
//                         value={nome}
//                         onChange={(e) => setNome(e.target.value)}
//                         autoComplete="name"
//                         className={inputClass}
//                     />
//                 </div>

//                 <CardNumberField value={cartao} onChange={setCartao} info={info} status={status} />

//                 <div className="flex flex-col gap-1.5">
//                     <label htmlFor="banco" className="text-sm font-medium text-gray-900">
//                         Banco
//                     </label>
//                     <input
//                         id="banco"
//                         value={banco}
//                         onChange={(e) => setBanco(e.target.value)}
//                         className={inputClass}
//                     />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                     <div className="flex flex-col gap-1.5">
//                         <label htmlFor="agencia" className="text-sm font-medium text-gray-900">
//                             Agência
//                         </label>
//                         <input
//                             id="agencia"
//                             value={agencia}
//                             onChange={(e) => setAgencia(e.target.value)}
//                             inputMode="numeric"
//                             className={inputClass}
//                         />
//                     </div>
//                     <div className="flex flex-col gap-1.5">
//                         <label htmlFor="conta" className="text-sm font-medium text-gray-900">
//                             Conta
//                         </label>
//                         <input
//                             id="conta"
//                             value={conta}
//                             onChange={(e) => setConta(e.target.value)}
//                             inputMode="numeric"
//                             className={inputClass}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Index;
import { useEffect, useState, type InputHTMLAttributes } from "react";
import Navbar from "../Componentes/NavBar";

interface BinInfo {
    scheme: string;
    type: string;
    issuer: string;
}

const titleCase = (s: string) =>
    s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

// Consulta o BIN (6 a 8 primeiros dígitos). O abort cancela a consulta anterior se o usuário continuar digitando.
function useBin(card: string) {
    const [info, setInfo] = useState<BinInfo | null>(null);
    const bin = card.replace(/\D/g, "").slice(0, 8);

    useEffect(() => {
        if (bin.length < 6) {
            setInfo(null);
            return;
        }
        const controller = new AbortController();

        fetch(`https://data.handyapi.com/bin/${bin}`, { signal: controller.signal })
            .then((res) => res.json())
            .then((d) =>
                setInfo(d.Status === "SUCCESS" ? { scheme: d.Scheme, type: d.Type, issuer: d.Issuer } : null)
            )
            .catch((err) => err.name !== "AbortError" && setInfo(null));

        return () => controller.abort();
    }, [bin]);

    return info;
}

function Field({ label, ...props }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-900">
            {label}
            <input
                {...props}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base font-normal outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            />
        </label>
    );
}

const Index = () => {
    const [nome, setNome] = useState("");
    const [cartao, setCartao] = useState("");
    const [banco, setBanco] = useState("");
    const [agencia, setAgencia] = useState("");
    const [conta, setConta] = useState("");

    const info = useBin(cartao);

    // Preenche o banco com o emissor, sem sobrescrever o que o usuário já digitou.
    useEffect(() => {
        if (info?.issuer) setBanco((prev) => prev || titleCase(info.issuer));
    }, [info]);

    return (
        <div className="min-h-screen bg-reuso-canvas p-8">
            <Navbar />

            <div className="mx-auto mt-8 flex max-w-sm flex-col gap-4">
                <Field label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" />

                <div>
                    <Field
                        label="Número do cartão"
                        value={cartao}
                        onChange={(e) =>
                            setCartao(e.target.value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim())
                        }
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="0000 0000 0000 0000"
                    />
                    {info && (
                        <p className="mt-1.5 text-sm text-gray-700">
                            {titleCase(info.issuer)} – {titleCase(info.scheme)} ({titleCase(info.type)})
                        </p>
                    )}
                </div>

                <Field label="Banco" value={banco} onChange={(e) => setBanco(e.target.value)} />

                <div className="grid grid-cols-2 gap-4">
                    <Field label="Agência" value={agencia} onChange={(e) => setAgencia(e.target.value)} inputMode="numeric" />
                    <Field label="Conta" value={conta} onChange={(e) => setConta(e.target.value)} inputMode="numeric" />
                </div>
            </div>
        </div>
    );
};

export default Index;
