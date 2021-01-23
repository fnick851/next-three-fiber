import Head from "next/head";
import { Canvas } from "react-three-fiber";
import Layout from "../components/Layout";
import Box from "../components/Box";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>

      <Canvas className="bg-black">
        <ambientLight args={["white", 0.1]} />
        <pointLight position={[10, 10, 10]} />
        <spotLight />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </Layout>
  );
}
