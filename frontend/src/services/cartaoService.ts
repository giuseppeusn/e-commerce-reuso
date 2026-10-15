import { API_BASE_URL } from '../config/api';

export const cartaoService = {
    async listarPorUsuario(usuarioId: string): Promise<any[]> {
        const response = await fetch(`${API_BASE_URL}/cartoes/${usuarioId}`);
        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.message || 'Erro ao carregar cartões.');
        }
        return await response.json();
    },

    async cadastrarCartao(userId: string, dados: any): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/cartoes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...dados, usuario: userId }),
        });
        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.mensagem || data.message || 'Erro ao cadastrar cartão.');
        }
        return await response.json();
    },

    async editarCartao(id: string, dados: any): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/cartoes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        });
        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.message || data.mensagem || 'Erro ao editar cartão.');
        }
        return await response.json();
    },

    async excluirCartao(id: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/cartoes/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.message || data.mensagem || 'Erro ao excluir cartão.');
        }
    },
}