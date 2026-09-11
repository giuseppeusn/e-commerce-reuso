export class Pagamento {
  private id: string;
  private formaPagamento: 'CARTAO' | 'PIX' | 'BOLETO';
  private dadosCriptografados: string;
  private statusProcessamento: 'PENDENTE' | 'PROCESSANDO' | 'APROVADO' | 'RECUSADO' | 'ESTORNADO';

  constructor(id: string, formaPagamento: 'CARTAO' | 'PIX' | 'BOLETO', dadosCriptografados: string) {
    this.id = id;
    this.formaPagamento = formaPagamento;
    this.dadosCriptografados = dadosCriptografados;
    this.statusProcessamento = 'PENDENTE';
  }

  public processarPagamento(): boolean {
    this.statusProcessamento = 'PROCESSANDO';
    this.statusProcessamento = 'APROVADO';
    return true;
  }

  public estornarPagamento(): boolean {
    if (this.statusProcessamento === 'APROVADO') {
      this.statusProcessamento = 'ESTORNADO';
      return true;
    }
    return false;
  }

  public getStatus(): string { return this.statusProcessamento; }
  public getFormaPagamento(): string { return this.formaPagamento; }
}
