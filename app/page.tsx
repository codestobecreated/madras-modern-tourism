import Navbar from "@/components/Header";

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Temporary Hero */}
      <section className="h-[700px] bg-[#173b5f]">
        <div className="mx-auto max-w-[1370px] px-5 pt-[230px]">
          <h1 className="text-5xl font-bold text-white">
            Discover, Dream, Travel
          </h1>
        </div>
      </section>
    </main>
  );
}
