import Head from "next/head"
import { Canvas } from "react-three-fiber"
import Layout from "../components/Layout"
import { OrbitControls } from "@react-three/drei"
import LoadingScene from "../components/LoadingScene"

export default function Basic() {
  return (
    <Layout>
      <Head>
        <title>Camera</title>
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
