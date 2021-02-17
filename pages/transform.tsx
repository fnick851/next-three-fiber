import Head from "next/head";
import { Canvas } from "react-three-fiber";
import Layout from "../components/Layout";

export default function Transform() {
  const boxPositions = [-1.5, 0, 1.5];
  const boxMeshes = boxPositions.map((pos, i) => (
    <mesh position={[pos, 0, 0]} key={i}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={0xff0000} />
    </mesh>
  ));

  return (
    <Layout>
      <Head>
        <title>Transform</title>
      </Head>

      <Canvas className="bg-black">
        <axesHelper args={[2]} />
        <group scale={[1, 2, 1]} rotation={[0, 0.2, 0]}>
          {boxMeshes}
        </group>
      </Canvas>
    </Layout>
  );
}
