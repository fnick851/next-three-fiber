import Head from "next/head"
import { Canvas, useLoader } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { NearestFilter, TextureLoader } from "three"
import { Suspense } from "react"
import { OrbitControls, Loader } from "@react-three/drei"

const textureImgs = [
  "/textures/minecraft.png",
  "/textures/checkerboard-8x8.png",
  "/textures/checkerboard-1024x1024.png",
]

function Scene() {
  const textures = textureImgs.map((img) => {
    const texture = useLoader(TextureLoader, img)
    texture.generateMipmaps = false
    texture.minFilter = NearestFilter
    texture.magFilter = NearestFilter
    return texture
  })

  return (
    <>
      {textures.map((texture, i) => (
        <mesh key={i} position={[0, 1.5 * (i - 1), 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      ))}
      <OrbitControls />
    </>
  )
}

export default function Textures() {
  return (
    <Layout>
      <Head>
        <title>Textures - three.js journey r3f</title>
      </Head>

      <Loader />
      <Canvas className="bg-black">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </Layout>
  )
}
