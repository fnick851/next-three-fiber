import Head from "next/head"
import { Canvas, useThree } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls, Loader } from "@react-three/drei"
import { Suspense } from "react"
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
      <Suspense fallback={null}>
        <Lights />
        <House />
        <Ghosts />
        <Graves />
        <Land />
        <OrbitControls />
      </Suspense>
    </>
  )
}

export default function GhostHouse() {
  return (
    <Layout>
      <Head>
        <title>Ghost House - Three.js Journey to R3F</title>
      </Head>

      <Loader />
      <Canvas
        className="bg-black"
        shadowMap={true}
        camera={{ position: [0, 5, 10] }}
      >
        <Scene />
      </Canvas>
      <Loader />
    </Layout>
  )
}
