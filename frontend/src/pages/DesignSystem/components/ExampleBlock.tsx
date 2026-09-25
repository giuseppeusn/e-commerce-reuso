import type { ReactNode } from "react";
import { CodeBlock, cn } from "../../../components/ui";

type ExampleBlockProps = {
  children: ReactNode;
  code: string;
  description?: string;
  previewClassName?: string;
  title: string;
};

/** Exemplo ao vivo à esquerda e o código correspondente à direita. */
export const ExampleBlock = ({
  children,
  code,
  description,
  previewClassName,
  title,
}: ExampleBlockProps) => (
  <article className="overflow-hidden rounded-3xl border border-reuso-border bg-reuso-surface shadow-reuso-sm">
    <div className="border-b border-reuso-border px-6 py-4">
      <h3 className="text-base font-semibold text-reuso-text">{title}</h3>
      {description ? (
        <p className="mt-1 text-sm leading-6 text-reuso-muted">{description}</p>
      ) : null}
    </div>
    <div className="grid xl:grid-cols-2">
      <div
        className={cn(
          "flex min-h-48 min-w-0 flex-wrap content-center items-center gap-3 bg-[radial-gradient(var(--ds-border)_1px,transparent_1px)] bg-size-[16px_16px] p-6",
          previewClassName,
        )}
      >
        {children}
      </div>
      <div className="min-w-0 border-t border-reuso-border p-3 xl:border-l xl:border-t-0">
        <CodeBlock className="h-full" code={code} />
      </div>
    </div>
  </article>
);
