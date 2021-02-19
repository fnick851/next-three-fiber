import Head from "next/head";
import dynamic from "next/dynamic";
import { Canvas, useUpdate } from "react-three-fiber";
import Layout from "../components/Layout";
import { BufferAttribute, BufferGeometry } from "three";

const Control = dynamic(() => import("../components/OrbitControls"), {
  ssr: false,
});

const count = 50 * 3 * 3;
const positionsArray = new Float32Array(count);
for (let i = 0; i < count; i++) positionsArray[i] = (Math.random() - 0.5) * 4;

const Scene = () => {
  const ref = useUpdate((geometry: BufferGeometry) => {
    geometry.setAttribute("position", new BufferAttribute(positionsArray, 3));
  }, []);

  return (
    <>
      <mesh>
        <bufferGeometry ref={ref} />
        <meshBasicMaterial color={0xff0000} wireframe={true} />
      </mesh>
      <Control />
    </>
  );
};

export default function Geometry() {
  return (
    <Layout>
      <Head>
        <title>Geometry</title>
      </Head>

      <Canvas className="bg-black">
        <Scene />
      </Canvas>
    </Layout>
  );
}
