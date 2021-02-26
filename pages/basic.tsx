import Head from "next/head"
import { Canvas } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls } from "@react-three/drei"

export default function Basic() {
  return (
    <Layout>
      <Head>
        <title>Basic</title>
      </Head>

      <Canvas className="bg-black">
        <mesh>
          <boxGeometry args={[1, 1, 1, 5, 5, 5]} />
          <meshBasicMaterial color={0xff0000} />
        </mesh>
        {
          //@ts-ignore
          <OrbitControls />
        }
      </Canvas>
    </Layout>
  )
}
