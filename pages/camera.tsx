import Head from "next/head"
import dynamic from "next/dynamic"
import { Canvas } from "react-three-fiber"
import Layout from "../components/Layout"

const OrbitControls = dynamic(() => import("../components/OrbitControls"), {
  ssr: false,
})

const Texts = dynamic(() => import("../components/Texts"), { ssr: false })

export default function Camera() {
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
        <OrbitControls />
        <Texts position={[-1, 1, 0]}>
          <p>Drag it.</p>
        </Texts>
      </Canvas>
    </Layout>
  )
}
