import Head from "next/head"
import { Canvas, useThree } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls, useGLTF, Loader } from "@react-three/drei"
import { Suspense } from "react"

function Scene() {
  const { scene } = useThree()
  const { scene: burgerModel } = useGLTF("/models/hamburger.glb")
  scene.add(burgerModel)

  return (
    <>
      <ambientLight intensity={0.1} color="lightpink" />
      <spotLight position={[8, 7, 8]} />
    </>
  )
}

export default function BurgerModel() {
  return (
    <Layout>
      <Head>
        <title>Burger Model - three.js journey r3f</title>
      </Head>

      <Loader />
      <Canvas
        shadowMap
        className="bg-black"
        camera={{ position: [-8, 12, 15] }}
      >
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </Layout>
  )
}
