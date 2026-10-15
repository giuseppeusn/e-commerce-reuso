import type { Endereco, EnderecoInput } from '../types/endereco';
import { API_BASE_URL } from '../config/api';

class EnderecoService {
  async listarPorUsuario(usuarioId: string): Promise<Endereco[]> {
    const response = await fetch(`${API_BASE_URL}/enderecos/usuario/${usuarioId}`);
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Erro ao carregar endereços.');
    }
    return await response.json();
  }

  async buscarPorId(id: string): Promise<Endereco> {
    const response = await fetch(`${API_BASE_URL}/enderecos/${id}`);
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Erro ao buscar endereço.');
    }
    return await response.json();
  }

  async criar(dados: EnderecoInput): Promise<Endereco> {
    const response = await fetch(`${API_BASE_URL}/enderecos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Erro ao cadastrar endereço.');
    }
    return await response.json();
  }

  async editar(id: string, dados: Partial<EnderecoInput>): Promise<Endereco> {
    const response = await fetch(`${API_BASE_URL}/enderecos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Erro ao atualizar endereço.');
    }
    return await response.json();
  }

  async excluir(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/enderecos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Erro ao excluir endereço.');
    }
  }
}

export default new EnderecoService();
