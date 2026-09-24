const Home = () => {
  return (
    <div className="min-h-screen bg-reuso-canvas p-8">
      <h1 className="text-4xl font-bold text-reuso-text">
        Teste do Design System
      </h1>
      <p className="mt-2 text-reuso-muted">
        Se esse texto estiver cinza-acinzentado e o fundo bege/sage, o tema está funcionando.
      </p>

      <div className="mt-6 flex gap-4">
        <button className="rounded-lg bg-reuso-primary px-4 py-2 text-reuso-primary-foreground shadow-reuso-sm hover:bg-reuso-primary-hover">
          Botão Primary
        </button>

        <button className="rounded-lg bg-reuso-secondary px-4 py-2 text-white hover:bg-reuso-secondary-hover">
          Botão Secondary
        </button>
      </div>

      <div className="mt-6 rounded-lg border border-reuso-border bg-reuso-surface p-4 shadow-reuso-md">
        <p className="text-reuso-text">Card de teste (surface + border)</p>
        <span className="text-reuso-danger">Texto de erro (danger)</span>
      </div>
    </div>
  );
};

export default Home;