import Image from "next/image";

import Background from "@/components/Background";
import Sobre from "@/components/Sobre";
import Carousel from "@/components/Carousel";
import Item from "@/components/Item";
import Contato from "@/components/Contato";

import personalImage from "../images/perfil.jpg";

export default function Home() {
  return (
    <Background>
      <header className=" text-white mx-auto text-center w-fit flex align-center items-center p-6
      absolute top-0 right-0 z-20">
        <div className="mr-4">
        <h1 className="text-2xl font-bold">Vinicius Pascoal</h1>
        <p className="text-gray-300">Full Stack Developer</p>
        </div>
        <Image
          src={personalImage}
          alt="Vinicius Pascoal"
          width={100}
          height={100}
          className="rounded-full mx-auto my-4 border-2 border-gray-300 shadow-lg "
        />
      </header>
      <div className="">
        <Carousel />
      </div>
      <Sobre />
      <div className=" bg-gray-900">
        <h2 className="text-3xl text-white text-center pt-3">Projetos :</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 p-6">
          <Item nome="Cestas E Afetos" descricao="Site de venda de cestas" url="https://github.com/vinicius-pascoal/cestas-E-afetos" />
          <Item nome="Crossword" descricao="Site de palavra cruzada" url="https://github.com/vinicius-pascoal/palavra-cruzada"/>
          <Item nome="Lista De Tarefas" descricao="Projeto de lista de tarefas" url="https://github.com/vinicius-pascoal/Todo-List"/>
          <Item nome="Cardapio Digital" descricao="Label de cardapio digital" url="https://github.com/vinicius-pascoal/cardapio-digital"/>
          <Item nome="Forca" descricao="Projeto de jogo da forca" url="https://github.com/vinicius-pascoal/forca"/>
          <Item nome="tiradentes-banking" descricao="Desafio da materia de residencia" url="https://github.com/vinicius-pascoal/tiradentes-banking"/>
          <Item nome="API de cursos" descricao="API para uma plataforma de cursos" url="https://github.com/vinicius-pascoal/squad_17_api_project"/>
          <Item nome="API de lanchonete" descricao="API para uma lanchonete" url="https://github.com/vinicius-pascoal/project-raio"/>
          <Item nome="CRUD" descricao="Um CRUD simples" url="https://github.com/vinicius-pascoal/projeto-crud"/>
        </div>
      </div>
      <Contato />
      <footer className="bg-gray-800 text-white p-4 mt-10">
        <p className="text-center">© 2025 Vinicius Pascoal</p>
      </footer>
    </Background>
  );
}
