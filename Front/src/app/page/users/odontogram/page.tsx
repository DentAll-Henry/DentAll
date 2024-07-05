import Head from "next/head";
import Odontograma from "../../../../components/Odontograma";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Odontograma</title>
        <meta name="description" content="Odontograma interactivo" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Odontograma Interactivo</h1>
        <Odontograma />
      </main>
    </div>
  );
}
