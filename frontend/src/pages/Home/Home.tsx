import Navbar from "../Componentes/NavBar";
// import imagemFundo from "./../../assets/imagem_fundo_home.jpg";

const Home = () => {

  return (
    <div className="min-h-screen p-8 bg-reuso-canvas ">
      <Navbar />
      {/* imagem fundo */}
      <div>
        <div className="w-full px-8 mt-10">
          {/* <img
            src={imagemFundo}
            alt="Imagem de fundo"
            className="w-full h-full object-cover"
          /> */}

          <div className=" flex items-center justify-center">
            <div className="max-w-2xl">

              <h1 className="text-3xl font-bold tracking-tight text-reuso-primary-foreground md:text-4xl lg:text-5xl">
                BEM-VINDO À NOSSA
                <br />
                LOJA ONLINE
              </h1>

              <p className="mt-3 text-sm text-reuso-primary-foreground md:text-base">
                Explore nossa variedade de produtos
                <br className="hidden md:block" />
                e encontre tudo o que você precisa.
              </p>

              <button
                type="button"
                className="mt-5 rounded-full bg-reuso-primary px-6 py-2 text-sm font-medium text-reuso-primary-foreground transition-colors hover:bg-reuso-primary-hover"
              >
                VER AGORA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;