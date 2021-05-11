import Head from "next/head"
import { Canvas } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls, Loader } from "@react-three/drei"
import { Suspense } from "react"
import { Leva } from "leva"
import { PostEffects } from "../components/post-processing/PostEffects"
import { Scene } from "../components/post-processing/Scene"

export default function PostProcessing() {
  return (
    <Layout>
      <Head>
        <title>Post Processing - Three.js Journey to R3F</title>
      </Head>

      <Loader />
      <Leva oneLineLabels={true} />
      <Canvas
        className="bg-black"
        camera={{ position: [4, 1, -4] }}
        shadowMap={true}
      >
        <Suspense fallback={null}>
          <Scene />
          <PostEffects />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </Layout>
  )
}
