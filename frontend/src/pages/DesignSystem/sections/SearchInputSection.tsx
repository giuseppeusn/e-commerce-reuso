import { useState } from "react";
import { SearchInput } from "../../../components/ui";
import { ComponentDocSection } from "../components/ComponentDocSection";
import { ExampleBlock } from "../components/ExampleBlock";

const code = `
import { useState } from "react";
import { SearchInput } from "../../components/ui";

export const BuscaNavbar = () => {
  const [busca, setBusca] = useState("");

  return (
    <SearchInput
      aria-label="Buscar produtos"
      value={busca}
      onValueChange={setBusca}
    />
  );
};

// Estados
<SearchInput size="sm" defaultValue="Peça XPTO" />
<SearchInput isLoading defaultValue="banco" variant="filled" />
`;

export const SearchInputSection = () => {
  const [search, setSearch] = useState("");

  return (
    <ComponentDocSection
      description="Busca em pílula com lupa, como na navbar do protótipo. Exibe botão de limpar quando há texto e um estado de carregamento."
      id="component-search-input"
      title="SearchInput"
      variations={["limpar", "loading", "controlado", "tamanhos"]}
    >
      <ExampleBlock code={code} previewClassName="grid gap-4" title="Busca de produtos">
        <SearchInput
          aria-label="Buscar produtos"
          onValueChange={setSearch}
          value={search}
        />
        <p className="-mt-2 pl-1 text-xs text-reuso-muted">
          Valor atual: <strong className="text-reuso-text">{search || "—"}</strong>
        </p>
        <SearchInput aria-label="Buscar" defaultValue="Peça XPTO" size="sm" />
        <SearchInput
          aria-label="Buscar"
          defaultValue="banco"
          isLoading
          variant="filled"
        />
      </ExampleBlock>
    </ComponentDocSection>
  );
};
