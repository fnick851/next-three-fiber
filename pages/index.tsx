import Head from "next/head";
import { Canvas } from "react-three-fiber";
import Layout from "../components/Layout";
import HomeScene from "../components/HomeScene";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>

      <Canvas className="bg-black">
        <HomeScene />
      </Canvas>
    </Layout>
  );
}
