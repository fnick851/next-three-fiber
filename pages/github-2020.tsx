import Head from "next/head"
import { Canvas } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { useControls, Leva } from "leva"
import { useFrame } from "react-three-fiber"
import { Suspense, useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { OrbitControls } from "@react-three/drei"
import { LoadingScene } from "../components/LoadingScene"

function Scene() {
  const gltf = useGLTF("/models/fnick851-github-2020.glb")
  const { nodes } = gltf

  const {
    mat_color,
    ambient_light_color,
    ambient_light_intensity,
    point_light_color,
    point_light_intensity,
    spot_light_color,
    spot_light_intensity,
  } = useControls({
    mat_color: { r: 200, b: 125, g: 125, a: 0.5 },
    ambient_light_color: "#ff0000",
    ambient_light_intensity: 0.1,
    point_light_color: "#b9d400",
    point_light_intensity: 1,
    spot_light_color: "#6495ed",
    spot_light_intensity: 3,
  })
  const rot_x = 1.3
  const rot_y = 3.1
  const rot_z = 2
  const scaleFactor = 0.02

  const meshRef = useRef(null)

  useFrame(() => {
    const mesh = meshRef.current
    if (mesh) mesh.rotation.z += 0.01
  })

  return (
    <>
      <mesh
        ref={meshRef}
        //@ts-ignore
        geometry={nodes.mesh_0.geometry}
        rotation={[rot_x, rot_y, rot_z]}
        scale={[scaleFactor, scaleFactor, scaleFactor]}
      >
        <meshPhongMaterial
          color={`rgb(${mat_color.r}, ${mat_color.g}, ${mat_color.b})`}
          transparent={true}
          opacity={mat_color.a}
        />
      </mesh>
      <ambientLight args={[ambient_light_color, ambient_light_intensity]} />
      <pointLight
        position={[10, 10, 10]}
        color={point_light_color}
        intensity={point_light_intensity}
      />
      <spotLight
        position={[-1.5, -1.5, -1]}
        color={spot_light_color}
        intensity={spot_light_intensity}
      />
      <OrbitControls />
    </>
  )
}

export default function Github2020() {
  return (
    <Layout>
      <Head>
        <title>Github 2020</title>
      </Head>

      <Leva oneLineLabels={true} />
      <Canvas className="bg-black">
        <Suspense fallback={<LoadingScene />}>
          <Scene />
        </Suspense>
      </Canvas>
    </Layout>
  )
}
