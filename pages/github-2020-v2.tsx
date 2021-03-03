import Head from "next/head"
import { Canvas, useThree } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { useControls } from "leva"
import { Suspense } from "react"
import { useGLTF } from "@react-three/drei"
import { OrbitControls } from "@react-three/drei"
import { LoadingScene } from "../components/LoadingScene"

function Scene() {
  const three = useThree()
  const { scene } = useGLTF("/models/fnick851-github-2020.glb")
  scene.scale.set(0.05, 0.05, 0.05)
  scene.rotation.set(-Math.PI * 0.5, 0, 0)
  three.scene.add(scene)

  const {
    ambient_light_color,
    ambient_light_intensity,
    point_light_color,
    point_light_intensity,
    spot_light_color,
    spot_light_intensity,
  } = useControls({
    ambient_light_color: "blue",
    ambient_light_intensity: 0.1,
    point_light_color: "hotpink",
    point_light_intensity: 0.2,
    spot_light_color: "gold",
    spot_light_intensity: 1,
  })

  return (
    <>
      <ambientLight args={[ambient_light_color, ambient_light_intensity]} />
      <pointLight
        position={[10, 10, 10]}
        color={point_light_color}
        intensity={point_light_intensity}
        castShadow={true}
      />
      <spotLight
        position={[-1.5, -1.5, -1]}
        color={spot_light_color}
        intensity={spot_light_intensity}
        castShadow={true}
      />
      <OrbitControls />
    </>
  )
}

export default function Github2020V2() {
  return (
    <Layout>
      <Head>
        <title>Github 2020 V2</title>
      </Head>

      <Canvas className="bg-black" shadowMap={true}>
        <Suspense fallback={<LoadingScene />}>
          <Scene />
        </Suspense>
      </Canvas>
    </Layout>
  )
}
