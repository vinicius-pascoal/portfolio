import Carousel from "@/components/Carousel";
import Background from "@/components/Background";

export default function Home() {

  return (
    <Background>
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Vinicius Pascoal</h1>
      </header>
      <div className="mt-10 ">
        <Carousel />
      </div>
    </Background>
  );
}
