import { AuthStrategy } from "./AuthStrategy.js";
import { ClienteAuthStrategy } from "./ClienteAuthStrategy.js";
import { AdminAuthStrategy } from "./AdminAuthStrategy.js";

export class AuthContextStrategy {
  // Mapeamento de tipos de conta para suas respectivas estratégias
  private static strategies: Record<string, AuthStrategy> = {
    CLIENTE: new ClienteAuthStrategy(),
    ADMINISTRADOR: new AdminAuthStrategy(),
  };

  // Retorna a estratégia apropriada para o tipo de conta informado
  public static obterEstrategia(tipoConta: string): AuthStrategy {
    const strategy = this.strategies[tipoConta];
    if (!strategy) {
      throw new Error(`Estratégia não encontrada para o perfil: ${tipoConta}`);
    }
    return strategy;
  }
}
