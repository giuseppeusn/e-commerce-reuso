import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { IconButton } from "../../components/ui";
import { ComponentSidebar } from "./components/ComponentSidebar";
import {
  componentNavigation,
  defaultComponentId,
} from "./data/componentNavigation";
import { designSystemSections } from "./sections";

const DesignSystem = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeComponentId, setActiveComponentId] = useState(defaultComponentId);
  const isDark = theme === "dark";

  const ActiveSection =
    designSystemSections.find((section) => section.id === activeComponentId)
      ?.Component ?? designSystemSections[0].Component;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    return () => {
      delete document.documentElement.dataset.theme;
    };
  }, [theme]);

  const handleSelectComponent = (componentId: string) => {
    setActiveComponentId(componentId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen w-full bg-reuso-canvas px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 rounded-3xl bg-reuso-primary px-6 py-8 text-reuso-primary-foreground sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest opacity-70">
              Reuso · UI kit
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              Design System
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 opacity-80">
              Componentes padronizados a partir do protótipo no Figma. Cada
              exemplo mostra o componente funcionando e o código para copiar.
            </p>
          </div>
          <IconButton
            className="self-start border-white/20! bg-white/10! text-inherit! hover:bg-white/20! sm:self-auto"
            icon={isDark ? <Sun /> : <Moon />}
            label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            variant="outline"
          />
        </header>

        <div className="grid items-start gap-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <ComponentSidebar
            activeComponentId={activeComponentId}
            groups={componentNavigation}
            onSelectComponent={handleSelectComponent}
          />
          <div className="min-w-0">
            <ActiveSection key={activeComponentId} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DesignSystem;
