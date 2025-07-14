import Background from "@/components/Background";
import Carousel from "@/components/Carousel";
import Item from "@/components/Item";
import Contato from "@/components/Contato";
import Image from "next/image";

import personalImage from "../images/perfil.jpg";


export default function Home() {
  const numero = `79991750501`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=55${numero}&text=Olá Vinicius, gostaria de entrar em contato!`;
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
      <div>
        <h2 className="text-3xl text-white text-center pt-3">Sobre Mim :</h2>
        <p className="text-gray-400 text-center p-6">
          Sou um desenvolvedor Full Stack apaixonado por criar soluções
          inovadoras e eficientes. Com experiência em diversas tecnologias,
          estou sempre em busca de novos desafios e oportunidades para aprender
          e crescer na área de desenvolvimento.
        </p>
        <h2 className="text-3xl text-white text-center pt-3">
          linguagens e tecnologias que domino:
        </h2>
        <ul className="text-gray-400 text-center p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
          <li>JavaScript</li>
          <li>TypeScript</li>
          <li>React</li>
          <li>Next.js</li>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>MongoDB</li>
          <li>PostgreSQL</li>
          <li>Tailwind CSS</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>Git</li>
          <li>GitHub</li>
          <li>Docker</li>
          <li>CI/CD</li>
          <li>Agile Methodologies</li>
        </ul>
      </div>
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
