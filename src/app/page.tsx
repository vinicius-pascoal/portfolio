import Background from "@/components/Background";
import Carousel from "@/components/Carousel";
import Item from "@/components/Item";

export default function Home() {

  return (
    <Background>
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Vinicius Pascoal</h1>
      </header>
      <div className="mt-10 ">
        <Carousel />
      </div>
      <div>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
      <footer className="bg-gray-800 text-white p-4 mt-10">
        <p className="text-center">© 2025 Vinicius Pascoal</p>
      </footer>
    </Background>
  );
}
