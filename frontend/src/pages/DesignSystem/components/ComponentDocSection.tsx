import type { ReactNode } from "react";
import { Badge } from "../../../components/ui";

type ComponentDocSectionProps = {
  children: ReactNode;
  description: string;
  id: string;
  title: string;
  importPath?: string;
  variations: string[];
};

export const ComponentDocSection = ({
  children,
  description,
  id,
  title,
  importPath = "../../components/ui",
  variations,
}: ComponentDocSectionProps) => (
  <section className="animate-slide-fade scroll-mt-6" id={id}>
    <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-reuso-secondary">
          Componente
        </p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-reuso-text">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-reuso-muted">
          {description}
        </p>
        <code className="mt-3 inline-block rounded-lg bg-reuso-surface-subtle px-2.5 py-1 text-xs text-reuso-muted">
          {`import { ${title} } from "${importPath}";`}
        </code>
      </div>
      <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
        {variations.map((variation) => (
          <Badge key={variation} appearance="outline">
            {variation}
          </Badge>
        ))}
      </div>
    </header>
    <div className="grid gap-6">{children}</div>
  </section>
);
