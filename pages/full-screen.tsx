import Head from "next/head"
import dynamic from "next/dynamic"
import { Canvas } from "react-three-fiber"
import Layout from "../components/Layout"
import { useRef } from "react"
import useFullScreen from "../hooks/useFullScreen"

declare global {
  interface Document {
    webkitFullscreenElement: any
    webkitExitFullscreen: any
  }
}

const OrbitControls = dynamic(() => import("../components/OrbitControls"), {
  ssr: false,
})

const Texts = dynamic(() => import("../components/Texts"), { ssr: false })

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
            <p>Double-click or drag on the scene.</p>
          </Texts>
          <OrbitControls />
        </Canvas>
      </div>
    </Layout>
  )
}
