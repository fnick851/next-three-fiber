import Head from "next/head"
import { Canvas, useThree } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import { LoadingScene } from "../components/LoadingScene"
import { Graves } from "../components/ghost-house/Graves"
import { Land } from "../components/ghost-house/Land"
import { Lights } from "../components/ghost-house/Lights"
import { Ghosts } from "../components/ghost-house/Ghosts"
import { House } from "../components/ghost-house/House"
import { Fog } from "three"

function Scene() {
  const { gl, scene } = useThree()
  gl.setClearColor("#262837")
  const fog = new Fog("#262837", 1, 15)
  scene.fog = fog

  return (
    <>
      <Lights />
      <Graves />
      <Ghosts />
      <Suspense fallback={<LoadingScene />}>
        <House />
        <Land />
      </Suspense>
      {
        //@ts-ignore
        <OrbitControls />
      }
    </>
  )
}

export default function GhostHouse() {
  return (
    <Layout>
      <Head>
        <title>Ghost House</title>
      </Head>

      <Canvas
        className="bg-black"
        shadowMap={true}
        camera={{ position: [0, 5, 10] }}
      >
        <Scene />
      </Canvas>
    </Layout>
  )
}
