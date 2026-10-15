import { useEffect, useState, type InputHTMLAttributes } from "react";
import { Button } from "../../components/ui";
import { useAuth } from '../../context/AuthContext';
interface BinInfo {
    scheme: string;
    type: string;
    issuer: string;
}
import { cartaoService } from '../../services/cartaoService';

interface AdicionarEnderecoProps {
    onSaved: () => void;
    onCancel: () => void;
    initialData?: {
        nome: string;
        numero: string;
        banco: string;
        agencia: string;
        conta: string;
    };
}

const titleCase = (s: string) =>
    s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

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
            .then((data) =>
                setInfo(
                    data.Status === "SUCCESS"
                        ? { scheme: data.Scheme, type: data.Type, issuer: data.Issuer }
                        : null,
                ),
            )
            .catch((error) => error.name !== "AbortError" && setInfo(null));

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

export const AdicinarEndereco = ({ onSaved, onCancel, initialData }: AdicionarEnderecoProps) => {
    const [nome, setNome] = useState(initialData?.nome ?? "");
    const [cartao, setCartao] = useState(initialData?.numero ?? "");
    const [banco, setBanco] = useState(initialData?.banco ?? "");
    const [agencia, setAgencia] = useState(initialData?.agencia ?? "");
    const [conta, setConta] = useState(initialData?.conta ?? "");
    const [errorMessage, setErrorMessage] = useState("");
    const { usuario } = useAuth()
    const userId = usuario?.id || (usuario as any)?._id;;
    const info = useBin(cartao);



    useEffect(() => {
        if (info?.issuer) setBanco((prev) => prev || titleCase(info.issuer));
    }, [info]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) return;
        const payload = {
            nome,
            numero: cartao.replace(/\s/g, ""),
            banco,
            agencia,
            conta,

        };
        try {
            const dados = initialData
                ? await cartaoService.editarCartao((initialData as { _id?: string; id?: string })._id || (initialData as { id?: string }).id || "", payload)
                : await cartaoService.cadastrarCartao(userId, payload);
            console.log('Cartão cadastrado:', dados);
            onSaved();
        } catch (error) {
            console.error('Erro ao cadastrar cartão:', error);
            setErrorMessage(error instanceof Error ? error.message : "Erro ao cadastrar cartão.");
        }
    }

    return (
        <div className="mx-auto mt-8 flex max-w-sm flex-col gap-4">
            <Field label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" />

            <div >
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
                <Field label="cvv" value={agencia} onChange={(e) => setAgencia(e.target.value)} inputMode="numeric" />
                <Field label="expiração" value={conta} onChange={(e) => setConta(e.target.value)} inputMode="numeric" />
            </div>
            {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
            <div className="flex gap-3">
                <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
                <Button onClick={handleSubmit}>{initialData ? "Salvar alterações" : "Salvar"}</Button>
            </div>
        </div>
    );
};