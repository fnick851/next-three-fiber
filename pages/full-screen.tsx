import Head from "next/head"
import { Canvas } from "react-three-fiber"
import Layout from "../components/Layout"
import { useRef } from "react"
import useFullScreen from "../hooks/useFullScreen"
import { OrbitControls } from "@react-three/drei"
import Texts from "../components/Texts"

export default function FullScreen() {
  const canvas = useRef(null)
  useFullScreen(canvas)

  return (
    <Layout>
      <Head>
        <title>Full Screen</title>
      </Head>

      <div className="h-full" ref={canvas}>
        <Canvas className="bg-black">
          <mesh>
            <boxGeometry args={[1, 1, 1, 5, 5, 5]} />
            <meshBasicMaterial color={0xff0000} />
          </mesh>
          <Texts position={[-1, 1, 0]}>
            <p>on desktop,</p>
            <p>double-click to go full screen.</p>
          </Texts>
          {
            //@ts-ignore
            <OrbitControls />
          }
        </Canvas>
      </div>
    </Layout>
  )
}
