import Background from "@/components/Background";
import Sobre from "@/components/Sobre";
import Carousel from "@/components/Carousel";
import Item from "@/components/Item";
import Contato from "@/components/Contato";
import Image from "next/image";

import personalImage from "../images/perfil.jpg";


export default function Home() {
  return (
    <Background>
      <header className=" text-white mx-auto text-center  ">
        <Image
          src={personalImage}
          alt="Vinicius Pascoal"
          width={100}
          height={100}
          className="rounded-full mx-auto my-4 border-2 border-gray-800 shadow-lg"
        />
        <h1 className="text-2xl font-bold">Vinicius Pascoal</h1>
        <p className="text-gray-400">Full Stack Developer</p>
      </header>
      <div className="">
        <Carousel />
      </div>
      <Sobre/>
      <div className=" bg-gray-900">
        <h2 className="text-3xl text-white text-center pt-3">Projetos :</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </div>
      <Contato />
      <footer className="bg-gray-800 text-white p-4 mt-10">
        <p className="text-center">© 2025 Vinicius Pascoal</p>
      </footer>
    </Background>
  );
}
