// o que o controller precisa que seja feito com cartões
// (serve pra injetar a implementação no controller)
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
