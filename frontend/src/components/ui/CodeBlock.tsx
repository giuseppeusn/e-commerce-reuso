import { Check, Copy } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { useMemo, useState } from "react";
import { cn } from "./utils";

export type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
  code: string;
  language?: string;
  title?: ReactNode;
  showLineNumbers?: boolean;
};

const normalizeCode = (code: string) => code.replace(/^\n|\n$/g, "");

const copyToClipboard = async (value: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

/** Bloco de código escuro, usado na página de design system. */
export const CodeBlock = ({
  className,
  code,
  language = "tsx",
  title,
  showLineNumbers = true,
  ...props
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const normalizedCode = useMemo(() => normalizeCode(code), [code]);
  const lines = useMemo(() => normalizedCode.split("\n"), [normalizedCode]);

  const handleCopy = async () => {
    await copyToClipboard(normalizedCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#2a313b] bg-[#151a21] text-slate-100",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/5 bg-white/[0.03] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          {title ? (
            <span className="text-xs font-medium text-slate-300">{title}</span>
          ) : null}
          <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-2xs font-semibold uppercase tracking-wider text-slate-400">
            {language}
          </span>
        </div>
        <button
          aria-label={copied ? "Código copiado" : "Copiar código"}
          className="ds-focus-ring inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          onClick={handleCopy}
          type="button"
        >
          {copied ? (
            <Check className="size-3.5 text-emerald-400" />
          ) : (
            <Copy className="size-3.5" />
          )}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>

      <pre className="max-h-[420px] flex-1 overflow-auto p-4 text-[13px] leading-6">
        <code className={`language-${language}`}>
          {showLineNumbers
            ? lines.map((line, index) => (
                <span className="table-row" key={`${index}-${line}`}>
                  <span className="table-cell select-none pr-4 text-right text-xs text-slate-600">
                    {index + 1}
                  </span>
                  <span className="table-cell whitespace-pre">{line || " "}</span>
                  {index < lines.length - 1 ? "\n" : null}
                </span>
              ))
            : normalizedCode}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
