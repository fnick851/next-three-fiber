import Head from "next/head"
import { Canvas } from "react-three-fiber"
import Layout from "../components/Layout"

export default function Basic() {
  return (
    <Layout>
      <Head>
        <title>Basic</title>
      </Head>

      <Canvas className="bg-black">
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
      </Canvas>
    </Layout>
  )
}
