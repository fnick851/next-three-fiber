import Head from "next/head"
import dynamic from "next/dynamic"
import { Canvas, useLoader } from "react-three-fiber"
import Layout from "../components/Layout"
import { NearestFilter, Texture, TextureLoader } from "three"
import { Suspense } from "react"

const OrbitControls = dynamic(() => import("../components/OrbitControls"), {
  ssr: false,
})

const textureImgs = [
  "/textures/minecraft.png",
  "/textures/checkerboard-8x8.png",
  "/textures/checkerboard-1024x1024.png",
]

const Scene = () => {
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

const LoadingScene = () => (
  <mesh>
    <boxGeometry />
    <meshBasicMaterial />
  </mesh>
)

export default function Textures() {
  return (
    <Layout>
      <Head>
        <title>Textures</title>
      </Head>

      <Canvas className="bg-black">
        <Suspense fallback={<LoadingScene />}>
          <Scene />
        </Suspense>
      </Canvas>
    </Layout>
  )
}
