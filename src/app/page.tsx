import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <div className="absolute w-full h-full">
        <Image
          className="relative object-cover"
          src="/CowField.jpg"
          alt="wei met koeien"
          fill
          priority
        />
      </div>
    </main>
  );
}
