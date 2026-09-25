// src/components/Navbar/Navbar.tsx
import { NavLink } from "react-router-dom";
import { Search, ShoppingCart, User } from "lucide-react";

const NAV_LINKS = [
  { label: "Início", path: "/" },
  { label: "Produtos", path: "/produtos" },
  { label: "Promoções", path: "/promocoes" },
  { label: "Lançamentos", path: "/lancamentos" },
];

const Navbar = () => {
  return (
    <header className="flex items-center justify-between gap-6 border-b border-reuso-border bg-reuso-surface px-8 py-4">
      <div className="flex items-center gap-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-reuso-neutral-strong text-xs font-semibold text-reuso-neutral-strong-foreground">
          LOGO
        </div>

        <nav className="flex items-center gap-8">
          {NAV_LINKS.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `text-sm transition-colors hover:text-reuso-primary ${
                  isActive
                    ? "font-semibold text-reuso-text underline underline-offset-4"
                    : "text-reuso-muted"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex flex-1 items-center justify-end gap-6">
        <div className="relative w-full max-w-sm">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-reuso-muted"
          />
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full rounded-full border border-reuso-border bg-reuso-canvas py-2 pl-9 pr-4 text-sm text-reuso-text outline-none placeholder:text-reuso-muted focus:border-reuso-primary focus:ring-2 focus:ring-reuso-primary/20"
          />
        </div>

        <button
          type="button"
          aria-label="Carrinho"
          className="text-reuso-text transition-colors hover:text-reuso-primary"
        >
          <ShoppingCart size={22} />
        </button>

        <button
          type="button"
          aria-label="Minha conta"
          className="text-reuso-text transition-colors hover:text-reuso-primary"
        >
          <User size={22} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;