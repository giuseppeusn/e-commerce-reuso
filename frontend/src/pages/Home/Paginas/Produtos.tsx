// src/pages/Home/Paginas/Produtos.tsx

import React, { useState, useEffect } from 'react';
import { PackagePlus } from "lucide-react";
import Navbar from "../../Componentes/NavBar";
import { Button, Input, Modal } from "../../../components/ui";

interface Produto {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  fotos: string[];
  statusAprovacao: string;
}

const Produtos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState<Produto | null>(null);
  
  // Estados do formulário
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [foto, setFoto] = useState('');

  const buscarProdutos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/produtos');
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  const abrirModalCadastro = () => {
    setProdutoEmEdicao(null);
    setNome('');
    setDescricao('');
    setPreco('');
    setFoto('');
    setIsModalOpen(true);
  };

  const abrirModalEdicao = (produto: Produto) => {
    setProdutoEmEdicao(produto);
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setPreco(produto.preco.toString());
    setFoto(produto.fotos && produto.fotos.length > 0 ? produto.fotos[0] : '');
    setIsModalOpen(true);
  };

  const handleSalvarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = produtoEmEdicao 
      ? `http://localhost:5000/api/produtos/${produtoEmEdicao._id}`
      : 'http://localhost:5000/api/produtos';
    
    const method = produtoEmEdicao ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          descricao,
          preco: Number(preco),
          fotos: [foto || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30']
        }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        buscarProdutos();
      } else {
        alert('Erro ao salvar produto');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const handleAprovar = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/produtos/${id}/aprovar`, {
        method: 'PATCH'
      });
      if (response.ok) buscarProdutos();
    } catch (error) {
      console.error('Erro ao aprovar:', error);
    }
  };

  const handleExcluir = async (id: string) => {
    if (confirm('Deseja realmente excluir este produto?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/produtos/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) buscarProdutos();
      } catch (error) {
        console.error('Erro ao excluir:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-reuso-canvas p-8">
      <Navbar />

      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-bold text-reuso-text">Gerenciamento de Produtos</h1>
        <Button leftIcon={<PackagePlus />} onClick={abrirModalCadastro}>
          Novo Produto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {produtos.map((produto) => (
          <div key={produto._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between">
            
            {/* Exibição da Imagem do Produto no Card */}
            {produto.fotos && produto.fotos.length > 0 && (
              <div className="w-full h-48 bg-gray-100 overflow-hidden">
                <img 
                  src={produto.fotos[0]} 
                  alt={produto.nome} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="p-5 flex flex-col flex-grow justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-gray-800">{produto.nome}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    produto.statusAprovacao === 'APROVADO' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {produto.statusAprovacao}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-2">{produto.descricao}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-green-600 font-bold text-lg">R$ {produto.preco.toFixed(2)}</span>
                </div>

                {/* Botões de Ação */}
                <div className="flex items-center justify-between gap-2">
                  {produto.statusAprovacao !== 'APROVADO' && (
                    <Button variant="success" size="sm" onClick={() => handleAprovar(produto._id)}>
                      Aprovar
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => abrirModalEdicao(produto)}>
                    Editar
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleExcluir(produto._id)}>
                    Excluir
                  </Button>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {produtos.length === 0 && (
        <p className="text-gray-500 mt-12 text-center">Nenhum produto cadastrado no momento.</p>
      )}

      {/* Modal unificado para Cadastro e Edição */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        headerIcon={<PackagePlus />}
        title={produtoEmEdicao ? "Editar Produto" : "Cadastrar Novo Produto"}
        description="Preencha os dados do produto."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSalvarProduto}>
              {produtoEmEdicao ? "Salvar Alterações" : "Cadastrar"}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSalvarProduto} className="grid gap-4">
          <Input 
            label="Nome do Produto" 
            placeholder="Ex: Teclado Mecânico" 
            value={nome} 
            onChange={(e: any) => setNome(e.target.value)} 
          />
          <Input 
            label="Descrição" 
            placeholder="Detalhes ou especificações" 
            value={descricao} 
            onChange={(e: any) => setDescricao(e.target.value)} 
          />
          <Input 
            label="Preço (R$)" 
            type="number" 
            placeholder="0.00" 
            value={preco} 
            onChange={(e: any) => setPreco(e.target.value)} 
          />
          <Input 
            label="URL da Foto" 
            placeholder="https://exemplo.com/foto.jpg" 
            value={foto} 
            onChange={(e: any) => setFoto(e.target.value)} 
          />
        </form>
      </Modal>
    </div>
  );
};

export default Produtos;