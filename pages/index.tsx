import Head from "next/head";
import { Canvas } from "react-three-fiber";

import Box from "../components/Box";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </>
  );
}
