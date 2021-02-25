import Head from "next/head"
import { Canvas, useFrame, useThree } from "react-three-fiber"
import Layout from "../components/Layout"
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
/**
 * temporarily remove the helper since it does not work with three@0.125
 */
// import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js"
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
    if (rectAreaLightRef.current) {
      rectAreaLightRef.current.lookAt(new Vector3())
      // const rectAreaLightHelper = new RectAreaLightHelper(
      //   rectAreaLightRef.current
      // )
      // rectAreaLightRef.current.add(rectAreaLightHelper)
    }
  })

  const spotLightRef = useRef(null)
  useEffect(() => {
    if (spotLightRef.current) {
      const spotLightTarget = spotLightRef.current.target
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

    sphereRef.current.rotation.y = 0.1 * elapsedTime
    cubeRef.current.rotation.y = 0.2 * elapsedTime
    torusRef.current.rotation.y = 0.3 * elapsedTime

    sphereRef.current.rotation.x = 0.2 * elapsedTime
    cubeRef.current.rotation.x = 0.15 * elapsedTime
    torusRef.current.rotation.x = 0.1 * elapsedTime
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

export default function Basic() {
  return (
    <Layout>
      <Head>
        <title>Lights</title>
      </Head>

      <Canvas className="bg-black">
        <Scene />
        {
          //@ts-ignore
          <OrbitControls />
        }
      </Canvas>
    </Layout>
  )
}
