export class CupomDesconto {
  private codigo: string;
  private valorDesconto: number;
  private isPercentual: boolean;
  private regrasVigencia: { validade: Date, valorMinimoPedido: number };
  private ativo: boolean;

  constructor(
    codigo: string,
    valorDesconto: number,
    isPercentual: boolean,
    regrasVigencia: { validade: Date, valorMinimoPedido: number }
  ) {
    this.codigo = codigo;
    this.valorDesconto = valorDesconto;
    this.isPercentual = isPercentual;
    this.regrasVigencia = regrasVigencia;
    this.ativo = true;
  }

  public validarCupom(valorSubtotal: number): boolean {
    const hoje = new Date();
    if (!this.ativo) return false;
    if (hoje > this.regrasVigencia.validade) return false;
    if (valorSubtotal < this.regrasVigencia.valorMinimoPedido) return false;
    
    return true;
  }

  public calcularDesconto(valorSubtotal: number): number {
    if (!this.validarCupom(valorSubtotal)) return 0;

    if (this.isPercentual) {
      return valorSubtotal * (this.valorDesconto / 100);
    }
    return Math.min(this.valorDesconto, valorSubtotal);
  }

  public setAtivo(status: boolean): void {
    this.ativo = status;
  }

  public getCodigo(): string { return this.codigo; }
}
