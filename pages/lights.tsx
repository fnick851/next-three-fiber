import Head from "next/head"
import { Canvas, useFrame, useThree } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls, useHelper } from "@react-three/drei"
import {
  DirectionalLightHelper,
  DoubleSide,
  HemisphereLightHelper,
  MeshStandardMaterial,
  PointLightHelper,
  SpotLightHelper,
  Vector3,
} from "three"
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js"
import { useEffect, useRef } from "react"

function Scene() {
  const { scene } = useThree()

  const hemisphereLightRef = useRef(null)
  useHelper(hemisphereLightRef, HemisphereLightHelper, 0.2)

  const directionalLightRef = useRef(null)
  useHelper(directionalLightRef, DirectionalLightHelper, 0.2)

  const pointLightRef = useRef(null)
  useHelper(pointLightRef, PointLightHelper, 0.2)

  const rectAreaLightRef = useRef(null)
  useEffect(() => {
    const light = rectAreaLightRef.current
    if (light) {
      light.lookAt(new Vector3())
      const rectAreaLightHelper = new RectAreaLightHelper(light)
      light.add(rectAreaLightHelper)
    }
  })

  const spotLightRef = useRef(null)
  useEffect(() => {
    const light = spotLightRef.current
    if (light) {
      const spotLightTarget = light.target
      spotLightTarget.position.x = 0.5
      scene.add(spotLightTarget)
    }
  })
  useHelper(spotLightRef, SpotLightHelper)

  const material = new MeshStandardMaterial()
  material.roughness = 0.4

  const sphereRef = useRef(null)
  const cubeRef = useRef(null)
  const torusRef = useRef(null)
  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    const sphere = sphereRef.current
    const cube = cubeRef.current
    const torus = torusRef.current

    if (sphere && cube && torus) {
      sphere.rotation.y = 0.1 * elapsedTime
      cube.rotation.y = 0.2 * elapsedTime
      torus.rotation.y = 0.3 * elapsedTime

      sphere.rotation.x = 0.2 * elapsedTime
      cube.rotation.x = 0.15 * elapsedTime
      torus.rotation.x = 0.1 * elapsedTime
    }
  })

  return (
    <>
      <mesh material={material} position={[-1.5, 0, 0]} ref={sphereRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
      </mesh>

      <mesh material={material} ref={cubeRef}>
        <boxGeometry args={[0.75, 0.75, 0.75]} />
      </mesh>

      <mesh material={material} position={[1.5, 0, 0]} ref={torusRef}>
        <torusGeometry args={[0.3, 0.2, 32, 64]} />
      </mesh>

      <mesh position={[0, -0.65, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial side={DoubleSide} />
      </mesh>

      <ambientLight color={"white"} intensity={0.05} />
      <directionalLight
        args={["orange"]}
        intensity={0.2}
        position={[1, 0.25, 0]}
        ref={directionalLightRef}
      />
      <hemisphereLight
        args={["blue", "red"]}
        intensity={0.2}
        ref={hemisphereLightRef}
      />
      <pointLight
        args={["hotpink", 0.6, 1, 1]}
        position={[1, -0.5, 1]}
        ref={pointLightRef}
      />
      <rectAreaLight
        args={["green", 2, 1.1, 1.1]}
        position={[-1.5, 0, 1.5]}
        ref={rectAreaLightRef}
      />
      <spotLight
        args={["yellow", 0.6, 6, Math.PI * 0.1, 0.25, 1]}
        position={[0, 2, 3]}
        ref={spotLightRef}
      />
    </>
  )
}

export default function Lights() {
  return (
    <Layout>
      <Head>
        <title>Lights - Three.js Journey to R3F</title>
      </Head>

      <Canvas className="bg-black">
        <Scene />
        <OrbitControls />
      </Canvas>
    </Layout>
  )
}
