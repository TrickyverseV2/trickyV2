import MainComponent from "@/components/MainComponent";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tricky Travellers</title>
        <meta
          name="description"
          content="Tricker Travellers Will Be Your Love"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full h-full 1overflow-hidden">
        <div className="fixed">
          <Sidebar />
        </div>
        <div className="w-[18rem]"></div>
        <MainComponent />
      </div>
    </>
  );
}
