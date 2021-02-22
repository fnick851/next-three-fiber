import Head from "next/head"
import { Canvas } from "react-three-fiber"
import Layout from "../components/Layout"
import { useControls } from "leva"
import { OrbitControls } from "@react-three/drei"
import Texts from "../components/Texts"

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
      <Texts position={[-1, 0.5, 0.5]}>
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
