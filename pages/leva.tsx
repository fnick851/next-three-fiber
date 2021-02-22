import Head from "next/head"
import dynamic from "next/dynamic"
import { Canvas } from "react-three-fiber"
import Layout from "../components/Layout"
import { useControls } from "leva"

const OrbitControls = dynamic(() => import("../components/OrbitControls"), {
  ssr: false,
})
const Texts = dynamic(() => import("../components/Texts"), { ssr: false })

function Scene() {
  const { text, width, height, depth, color } = useControls({
    text: "say something...",
    width: 1,
    height: 1,
    depth: 1,
    color: { r: 200, b: 125, g: 125, a: 0.5 },
  })

  return (
    <>
      <mesh>
        <boxGeometry args={[width, height, depth]} />
        <meshBasicMaterial
          color={`rgb(${color.r}, ${color.g}, ${color.b})`}
          transparent={true}
          opacity={color.a}
        />
      </mesh>
      <Texts position={[-0.5, 0.5, 0.5]}>
        <p>{text}</p>
      </Texts>
      <OrbitControls />
    </>
  )
}

export default function Leva() {
  return (
    <Layout>
      <Head>
        <title>Leva</title>
      </Head>

      <Canvas className="bg-black">
        <Scene />
      </Canvas>
    </Layout>
  )
}
