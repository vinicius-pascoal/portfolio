import Image from "next/image";

import whatsLogo from "../images/social/whats.svg";
import instagramLogo from "../images/social/instagram.svg";
import githubLogo from "../images/social/github.svg";
import linkedinLogo from "../images/social/linkedin.svg";


export default function Contato() {
  const numero = `79991750501`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=55${numero}&text=Olá Vinicius, gostaria de entrar em contato!`;

  return (
    <div className=" p-6 text-center">
        <h2 className="text-3xl text-white mb-4">Contato</h2>
        <p className="text-gray-400 mb-4">
          Você pode me encontrar nas redes sociais ou entrar em contato
          diretamente pelo WhatsApp.
        </p>
        <div className=" flex justify-center gap-4 flex-wrap">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition-colors flex items-center"
          >
            <Image
              src={whatsLogo}
              alt="WhatsApp Logo"
              width={24}
              height={24}
              className="inline-block mr-2"
            />
            WhatsApp
          </a>
          <a
            href="https://www.instagram.com/vinicius_pascoal_q/?next=%2F"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition-colors"
          >
            <Image
              src={instagramLogo}
              alt="Instagram Logo"
              width={24}
              height={24}
              className="inline-block mr-2"
            />
            Instagram
          </a>
          <a
            href="https://github.com/vinicius-pascoal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded transition-colors"
          >
            <Image
              src={githubLogo}
              alt="GitHub Logo"
              width={24}
              height={24}
              className="inline-block mr-2"
            />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vinicius-pascoal-queiroz-maynard-38854024a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
          >
            <Image
              src={linkedinLogo}
              alt="LinkedIn Logo"
              width={24}
              height={24}
              className="inline-block mr-2"
            />
            LinkedIn
          </a>
        </div>
      </div>
  )
}
