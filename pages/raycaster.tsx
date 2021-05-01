import Head from "next/head"
import { Canvas, MeshProps, useFrame } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls, useHelper } from "@react-three/drei"
import { useMemo, useRef, useState } from "react"
import { useBodyPointerCursor } from "../hooks/useBodyPointerCursor"
import { SpotLightHelper } from "three"

function Ball(props: MeshProps) {
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useBodyPointerCursor(hovered)

  const ballRef = useRef(null)
  const rate = useMemo(() => Math.random() + 0.5, [])
  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    const ball = ballRef.current

    if (ball) {
      ball.position.y = Math.sin(elapsedTime * rate)
    }
  })

  return (
    <mesh
      {...props}
      ref={ballRef}
      onClick={() => setActive(!active)}
      scale={
        active
          ? [5 * Math.random(), 5 * Math.random(), 5 * Math.random()]
          : [1, 1, 1]
      }
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "red"} />
    </mesh>
  )
}

function Scene() {
  const ballPosX = [-2, 0, 2]

  const spotLightRef = useRef(null)
  useHelper(spotLightRef, SpotLightHelper)

  return (
    <>
      {" "}
      {ballPosX.map((posX, index) => (
        <Ball position={[posX, 0, 0]} key={index} />
      ))}
      <ambientLight intensity={0.1} />
      <spotLight ref={spotLightRef} />
      <OrbitControls />
    </>
  )
}

export default function Raycaster() {
  return (
    <Layout>
      <Head>
        <title>Raycaster - three.js journey r3f</title>
      </Head>

      <Canvas className="bg-black">
        <Scene />
      </Canvas>
    </Layout>
  )
}
