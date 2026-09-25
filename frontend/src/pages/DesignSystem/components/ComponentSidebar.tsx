import { cn } from "../../../components/ui";
import type { ComponentNavigationGroup } from "../types";

type ComponentSidebarProps = {
  activeComponentId: string;
  groups: ComponentNavigationGroup[];
  onSelectComponent: (componentId: string) => void;
};

export const ComponentSidebar = ({
  activeComponentId,
  groups,
  onSelectComponent,
}: ComponentSidebarProps) => (
  <aside className="min-w-0 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
    <nav
      aria-label="Componentes do UI kit"
      className="flex flex-col gap-6 rounded-3xl border border-reuso-border bg-reuso-surface p-4 shadow-reuso-sm"
    >
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <p className="px-3 pb-1 text-2xs font-semibold uppercase tracking-widest text-reuso-muted">
            {group.title}
          </p>
          {group.items.map((item) => {
            const isActive = item.id === activeComponentId;

            return (
              <button
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "ds-focus-ring cursor-pointer rounded-xl px-3 py-2 text-left text-sm transition-colors",
                  isActive
                    ? "bg-reuso-primary font-semibold text-reuso-primary-foreground"
                    : "text-reuso-text hover:bg-reuso-surface-subtle",
                )}
                key={item.id}
                onClick={() => onSelectComponent(item.id)}
                type="button"
              >
                {item.name}
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  </aside>
);
