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
  
  // Estados do formulário de cadastro
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [foto, setFoto] = useState('');

  // Busca os produtos cadastrados no backend (GET)
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

  // Envia o novo produto para o backend (POST)
  const handleCadastrarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          descricao,
          preco: Number(preco),
          fotos: [foto || 'default.jpg']
        }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setNome('');
        setDescricao('');
        setPreco('');
        setFoto('');
        buscarProdutos(); // Atualiza a listagem na tela
      } else {
        alert('Erro ao cadastrar produto');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div className="min-h-screen bg-reuso-canvas p-8">
      <div>
        <Navbar />
      </div>

      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-bold text-reuso-text">Produtos</h1>
        {/* Botão padrão do Design System */}
        <Button leftIcon={<PackagePlus />} onClick={() => setIsModalOpen(true)}>
          Novo Produto
        </Button>
      </div>

      {/* Grid de Cards de Produtos (Tela 1 - Listagem) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {produtos.map((produto) => (
          <div key={produto._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg text-gray-800">{produto.nome}</h3>
              <p className="text-gray-600 text-sm mt-1">{produto.descricao}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-green-600 font-bold">R$ {produto.preco.toFixed(2)}</span>
              <span className="text-xs px-2.5 py-1 bg-yellow-50 text-yellow-700 rounded-full font-medium">
                {produto.statusAprovacao}
              </span>
            </div>
          </div>
        ))}
      </div>

      {produtos.length === 0 && (
        <p className="text-gray-500 mt-12 text-center">Nenhum produto cadastrado no momento.</p>
      )}

      {/* Modal de Cadastro (Tela 2 - Cadastro via Modal utilizando o Design System) */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        headerIcon={<PackagePlus />}
        title="Cadastrar Novo Produto"
        description="Preencha os dados para disponibilizar um novo produto."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCadastrarProduto}>
              Salvar Produto
            </Button>
          </>
        }
      >
        <form onSubmit={handleCadastrarProduto} className="grid gap-4">
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