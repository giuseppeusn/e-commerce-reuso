export interface ICartaoStrategy {
  criar(dados: Record<string, unknown>): Promise<unknown>;

  listar(usuarioId: string): Promise<unknown>;

  buscarPorId(id: string): Promise<unknown>;

  atualizar(
    id: string,
    dados: Record<string, unknown>
  ): Promise<unknown>;

  deletar(id: string): Promise<unknown>;
}