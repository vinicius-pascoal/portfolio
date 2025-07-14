import Image from "next/image";
import Git from "../images/social/github.svg";

interface ItemProps {
  nome: string;
  descricao: string;
  url: string;
}

export default function Item({ nome, descricao, url }: ItemProps) {
  return (
    <a href={url} className="flex items-center justify-baseline p-6 bg-gray-800 text-white rounded-lg shadow-lg mx-10 my-10">
      <Image
        src={Git}
        alt="Item Image"
        width={50}
        height={50}
        className="rounded-lg shadow-lg mr-6"
      />
      <div>
      <h2 className="text-2xl font-bold mb-1">{nome}</h2>
      <p>{descricao}</p>
      </div>
    </a>
  );
}
