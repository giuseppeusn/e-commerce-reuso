import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Input, Select, Button } from '../../components/ui';
import type { Endereco, EnderecoInput } from '../../types/endereco';
import { ESTADOS_BRASIL, formatCEP } from './constants';

interface EnderecoFormProps {
  initialData?: Endereco | null;
  mode: 'novo' | 'editar';
  onSubmit: (data: EnderecoInput) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

export const EnderecoForm = ({
  initialData,
  mode,
  onSubmit,
  onCancel,
  isSaving,
}: EnderecoFormProps) => {
  const [formData, setFormData] = useState<EnderecoInput>({
    nome: '',
    logradouro: '',
    numero: '',
    complemento: '',
    cep: '',
    estado: 'AC',
    cidade: '',
    bairro: '',
    favorito: false,
  });

  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || '',
        logradouro: initialData.logradouro || '',
        numero: initialData.numero || '',
        complemento: initialData.complemento || '',
        cep: initialData.cep ? formatCEP(initialData.cep) : '',
        estado: initialData.estado || 'SP',
        cidade: initialData.cidade || '',
        bairro: initialData.bairro || '',
        favorito: initialData.favorito || false,
      });
    } else {
      setFormData({
        nome: '',
        logradouro: '',
        numero: '',
        complemento: '',
        cep: '',
        estado: 'AC',
        cidade: '',
        bairro: '',
        favorito: false,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value);
    setFormData((prev) => ({
      ...prev,
      cep: formatted,
    }));

    // Auto-preenchimento via ViaCEP se tiver 8 dígitos
    const cleanCep = formatted.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            logradouro: data.logradouro || prev.logradouro,
            bairro: data.bairro || prev.bairro,
            cidade: data.localidade || prev.cidade,
            estado: data.uf || prev.estado,
          }));
        }
      } catch {
        // Ignora erro de rede no auto-preenchimento
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.nome.trim()) {
      setFormError('Por favor, informe o nome.');
      return;
    }
    if (!formData.logradouro.trim()) {
      setFormError('Por favor, informe o endereço (logradouro).');
      return;
    }
    if (!formData.numero.trim()) {
      setFormError('Por favor, informe o número.');
      return;
    }
    const cleanCep = formData.cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setFormError('O CEP deve conter 8 dígitos.');
      return;
    }
    if (!formData.cidade.trim()) {
      setFormError('Por favor, informe a cidade.');
      return;
    }
    if (!formData.bairro.trim()) {
      setFormError('Por favor, informe o bairro.');
      return;
    }

    try {
      await onSubmit({
        ...formData,
        cep: cleanCep,
      });
    } catch (err: any) {
      setFormError(err.message || 'Erro ao salvar o endereço.');
    }
  };

  const title = mode === 'novo' ? 'NOVO ENDEREÇO' : 'EDITAR ENDEREÇO';

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-lg mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-reuso-muted hover:text-reuso-text transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Voltar para meus endereços</span>
        </button>
      </div>

      <h1 className="text-xl font-bold uppercase tracking-wider text-reuso-text mb-6 text-center">
        {title}
      </h1>

      {formError && (
        <div className="w-full max-w-lg p-3 mb-4 text-xs text-red-600 bg-red-50 rounded-lg border border-red-200">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        {/* Campo: Nome */}
        <Input
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          shape="pill"
          variant="filled"
          placeholder=""
          required
        />

        {/* Campo: Endereço (logradouro) */}
        <Input
          label="Endereço"
          name="logradouro"
          value={formData.logradouro}
          onChange={handleChange}
          shape="pill"
          variant="filled"
          placeholder=""
          required
        />

        {/* Linha com Número, Complemento, CEP (3 colunas) */}
        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Número"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            shape="pill"
            variant="filled"
            placeholder=""
            required
          />
          <Input
            label="Complemento"
            name="complemento"
            value={formData.complemento || ''}
            onChange={handleChange}
            shape="pill"
            variant="filled"
            placeholder=""
          />
          <Input
            label="CEP"
            name="cep"
            value={formData.cep}
            onChange={handleCepChange}
            shape="pill"
            variant="filled"
            placeholder="00000-000"
            maxLength={9}
            required
          />
        </div>

        {/* Linha com Estado, Cidade, Bairro (3 colunas) */}
        <div className="grid grid-cols-3 gap-3">
          <Select
            label="Estado"
            name="estado"
            options={ESTADOS_BRASIL}
            value={formData.estado}
            onChange={handleChange}
            shape="pill"
            variant="filled"
            required
          />
          <Input
            label="Cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            shape="pill"
            variant="filled"
            placeholder=""
            required
          />
          <Input
            label="Bairro"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            shape="pill"
            variant="filled"
            placeholder=""
            required
          />
        </div>

        {/* Botão Salvar centralizado */}
        <div className="pt-6 flex flex-col items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            shape="pill"
            uppercase
            size="md"
            className="px-10 bg-[#2C3338] hover:bg-[#1E2327] text-white"
            disabled={isSaving}
          >
            {isSaving ? 'SALVANDO...' : 'SALVAR'}
          </Button>

          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-reuso-muted hover:underline tracking-wider uppercase font-semibold"
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnderecoForm;
