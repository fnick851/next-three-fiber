import Head from "next/head"
import { Canvas } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import { LoadingScene } from "../components/LoadingScene"
import { Leva } from "leva"
import { PostEffects } from "../components/post-processing/PostEffects"
import { Scene } from "../components/post-processing/Scene"

export default function RealisticHelmet() {
  return (
    <Layout>
      <Head>
        <title>Post Processing</title>
      </Head>

      <Leva oneLineLabels={true} />
      <Canvas
        className="bg-black"
        camera={{ position: [4, 1, -4] }}
        shadowMap={true}
      >
        <Suspense fallback={<LoadingScene />}>
          <Scene />
          <PostEffects />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </Layout>
  )
}
