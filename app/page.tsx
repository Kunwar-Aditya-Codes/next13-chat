import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* hero section */}
      <section className="h-screen text-slate-100 flex bg-[#101010] p-16">
        <div className="flex-[0.4]  p-4 flex flex-col items-start justify-evenly">
          <h1 className="text-2xl md:text-4xl lg:text-7xl  font-bold tracking-widest uppercase">
            Whisper Wire
          </h1>

          <Link href={"/login"}>
            <p className="bg-slate-100 px-6 py-2 rounded-sm text-black text-xl font-medium uppercase tracking-wide">
              Login
            </p>
          </Link>
        </div>
        <div className="flex-[0.6] w-full   p-4"></div>
      </section>

      {/* About Me */}

      {/* Footer */}
    </main>
  );
}
