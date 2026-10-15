import type { ReactElement } from "react";

type Brand = "visa" | "mastercard" | "elo" | "amex" | "hipercard" | "default";

interface CardPreviewProps {
    nome: string;
    numero: string; // pode vir formatado ("1234 5678 ...") ou só dígitos
    scheme?: string; // vem do BIN: "VISA", "MASTERCARD", "ELO"...
    type?: string; // "CREDIT" | "DEBIT"
    issuer?: string; // nome do banco emissor
}

const titleCase = (s: string) =>
    s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

// Prefixos mais comuns de cada bandeira. Só é usado quando o BIN ainda não respondeu.
function brandFromDigits(d: string): Brand {
    if (/^(4011|4312|4389|4514|4576|5041|5066|5067|509|6277|6362|6363|650|6516|6550)/.test(d)) return "elo";
    if (/^(606282|3841)/.test(d)) return "hipercard";
    if (/^3[47]/.test(d)) return "amex";
    if (/^(5[1-5]|2(2[2-9]|[3-6]|7[01]|720))/.test(d)) return "mastercard";
    if (/^4/.test(d)) return "visa";
    return "default";
}

function detectBrand(scheme: string | undefined, digits: string): Brand {
    const s = (scheme ?? "").toLowerCase();
    if (s.includes("visa")) return "visa";
    if (s.includes("master")) return "mastercard";
    if (s.includes("amex") || s.includes("american")) return "amex";
    if (s.includes("hiper")) return "hipercard";
    if (s.includes("elo")) return "elo";
    return brandFromDigits(digits);
}

/* ---------- Logos (SVG simples, sem dependência externa) ---------- */

const logoClass = "h-9 w-auto";

const logos: Record<Brand, ReactElement> = {
    visa: (
        <svg viewBox="0 0 80 28" className={logoClass} role="img" aria-label="Visa">
            <text
                x="40"
                y="23"
                textAnchor="middle"
                fontFamily="Georgia, 'Times New Roman', serif"
                fontStyle="italic"
                fontWeight="800"
                fontSize="26"
                letterSpacing="1"
                fill="#fff"
            >
                VISA
            </text>
        </svg>
    ),
    mastercard: (
        <svg viewBox="0 0 48 30" className={logoClass} role="img" aria-label="Mastercard">
            <circle cx="17" cy="15" r="13" fill="#eb001b" />
            <circle cx="31" cy="15" r="13" fill="#f79e1b" />
            <path d="M24 4.8a13 13 0 0 1 0 20.4a13 13 0 0 1 0-20.4z" fill="#ff5f00" />
        </svg>
    ),
    elo: (
        <svg viewBox="0 0 64 30" className={logoClass} role="img" aria-label="Elo">
            <text
                x="2"
                y="23"
                fontFamily="system-ui, Arial, sans-serif"
                fontWeight="800"
                fontSize="26"
                letterSpacing="-1"
                fill="#fff"
            >
                el
            </text>
            <circle cx="40" cy="16" r="8" fill="#ffcb05" />
            <circle cx="47" cy="12" r="3.2" fill="#00a4e0" />
            <circle cx="52" cy="19" r="3.2" fill="#ef4123" />
        </svg>
    ),
    amex: (
        <svg viewBox="0 0 64 30" className={logoClass} role="img" aria-label="American Express">
            <rect x="1" y="3" width="62" height="24" rx="3" fill="#fff" />
            <text
                x="32"
                y="21"
                textAnchor="middle"
                fontFamily="system-ui, Arial, sans-serif"
                fontWeight="800"
                fontSize="15"
                letterSpacing="1"
                fill="#006fcf"
            >
                AMEX
            </text>
        </svg>
    ),
    hipercard: (
        <svg viewBox="0 0 110 28" className={logoClass} role="img" aria-label="Hipercard">
            <text
                x="55"
                y="21"
                textAnchor="middle"
                fontFamily="system-ui, Arial, sans-serif"
                fontWeight="800"
                fontSize="20"
                fill="#fff"
            >
                Hipercard
            </text>
        </svg>
    ),
    default: (
        <svg viewBox="0 0 40 28" className={logoClass} role="img" aria-label="Cartão">
            <rect x="2" y="3" width="36" height="22" rx="4" fill="none" stroke="#fff" strokeWidth="2" />
            <rect x="2" y="9" width="36" height="5" fill="#fff" />
        </svg>
    ),
};

const gradients: Record<Brand, string> = {
    visa: "bg-gradient-to-br from-[#1a1f71] via-[#27329a] to-[#4a5bd0]",
    mastercard: "bg-gradient-to-br from-[#1c1c1e] via-[#34343a] to-[#55555e]",
    elo: "bg-gradient-to-br from-[#0b0b0c] via-[#1d1d20] to-[#3a3a40]",
    amex: "bg-gradient-to-br from-[#006fcf] via-[#2a8be0] to-[#6bb8f2]",
    hipercard: "bg-gradient-to-br from-[#9c0f16] via-[#c4202a] to-[#e8554a]",
    default: "bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500",
};

const typeLabel = (t?: string) => {
    const s = (t ?? "").toLowerCase();
    if (s.includes("credit")) return "Crédito";
    if (s.includes("debit")) return "Débito";
    return t ? titleCase(t) : "";
};

export function CardPreview({ nome, numero, scheme, type, issuer }: CardPreviewProps) {
    const digits = numero.replace(/\D/g, "");
    const brand = detectBrand(scheme, digits);

    // Só mostra os 4 últimos quando o número já está completo o bastante.
    const last4 = digits.length >= 13 ? digits.slice(-4) : null;

    return (
        <div
            className={`relative aspect-[1.586] w-full max-w-sm overflow-hidden rounded-2xl p-5 text-white shadow-lg ${gradients[brand]}`}
        >
            {/* brilho decorativo */}
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-black/10" />

            <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                            {issuer ? titleCase(issuer) : "Seu banco"}
                        </p>
                        {typeLabel(type) && <p className="text-xs text-white/70">{typeLabel(type)}</p>}
                    </div>
                    <div className="h-7 w-10 shrink-0 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500" />
                </div>

                {/* Número: os 12 primeiros dígitos são fictícios e borrados; só o final aparece nítido */}
                <div>
                    <span className="sr-only">
                        Número do cartão oculto{last4 ? `, final ${last4}` : ""}
                    </span>
                    <p
                        aria-hidden="true"
                        className="flex gap-3 font-mono text-xl tracking-widest"
                    >
                        {[0, 1, 2].map((i) => (
                            <span key={i} className="select-none blur-[6px]">
                                0000
                            </span>
                        ))}
                        <span className={last4 ? "" : "select-none blur-[6px]"}>{last4 ?? "0000"}</span>
                    </p>
                </div>

                <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-[10px] text-white/70">Titular</p>
                        <p className="truncate text-sm font-medium uppercase tracking-wide">
                            {nome.trim() || "Nome do titular"}
                        </p>
                    </div>
                    <div className="shrink-0">{logos[brand]}</div>
                </div>
            </div>
        </div>
    );
}

export default CardPreview;