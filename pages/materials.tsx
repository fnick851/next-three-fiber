import Head from "next/head"
import Layout from "../components/Layout"
import { OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "react-three-fiber"
import { Controls, useControl } from "react-three-gui"
import { CubeTextureLoader, DoubleSide } from "three"

function Scene() {
  const cubeTextureLoader = new CubeTextureLoader()
  const envMapTexture = cubeTextureLoader.load([
    "/textures/environmentMaps/0/px.jpg",
    "/textures/environmentMaps/0/nx.jpg",
    "/textures/environmentMaps/0/py.jpg",
    "/textures/environmentMaps/0/ny.jpg",
    "/textures/environmentMaps/0/pz.jpg",
    "/textures/environmentMaps/0/nz.jpg",
  ])

  const metalness = useControl("Metal", {
    type: "number",
    value: 1,
    min: 0,
    max: 1,
  })
  const roughness = useControl("Rough", {
    type: "number",
    value: 0,
    min: 0,
    max: 1,
  })

  const sphereRef = useRef(null)
  const planeRef = useRef(null)
  const torusRef = useRef(null)

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()

    sphereRef.current.rotation.y = 0.2 * elapsedTime
    planeRef.current.rotation.y = 0.2 * elapsedTime
    torusRef.current.rotation.y = 0.2 * elapsedTime

    sphereRef.current.rotation.x = 0.2 * elapsedTime
    planeRef.current.rotation.x = 0.2 * elapsedTime
    torusRef.current.rotation.x = 0.2 * elapsedTime
  })

  return (
    <>
      <mesh position={[-1.5, 0, 0]} ref={sphereRef}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial
          metalness={metalness}
          roughness={roughness}
          envMap={envMapTexture}
        />
      </mesh>
      <mesh ref={planeRef}>
        <planeGeometry args={[1, 1, 100, 100]} />
        <meshStandardMaterial
          side={DoubleSide}
          metalness={metalness}
          roughness={roughness}
          envMap={envMapTexture}
        />
      </mesh>
      <mesh position={[1.5, 0, 0]} ref={torusRef}>
        <torusGeometry args={[0.3, 0.2, 64, 128]} />
        <meshStandardMaterial
          metalness={metalness}
          roughness={roughness}
          envMap={envMapTexture}
        />
      </mesh>
    </>
  )
}

export default function Materials() {
  return (
    <Layout>
      <Head>
        <title>Materials</title>
      </Head>

      <Controls.Provider>
        <Controls.Canvas className="bg-black">
          <Scene />
          <ambientLight color={0xffffff} intensity={0.5} />
          <pointLight color={0xffffff} intensity={0.5} position={[2, 3, 4]} />
          <OrbitControls />
        </Controls.Canvas>
        <Controls title="Parameter Control" anchor="bottom_left" />
      </Controls.Provider>
    </Layout>
  )
}
