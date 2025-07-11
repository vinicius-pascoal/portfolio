import Image from "next/image";
import teste from "../images/teste.jpg";

export default function Item() {
  return (
    <div className="flex items-center justify-baseline p-6 bg-gray-800 text-white rounded-lg shadow-lg mx-20 my-10">
      <Image
        src={teste}
        alt="Item Image"
        width={50}
        height={50}
        className="rounded-lg shadow-lg mr-6"
      />
      <div>
      <h2 className="text-2xl font-bold mb-1">Item Component</h2>
      <p>This is a placeholder for the Item component.</p>
      </div>
    </div>
  );
}
