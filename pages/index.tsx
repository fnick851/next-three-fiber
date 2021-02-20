import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import { Canvas, MeshProps, useFrame } from "react-three-fiber"
import { Mesh } from "three"
import Layout from "../components/Layout"

function Box(props: MeshProps) {
  const mesh = useRef<Mesh>()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const body = document.body
    if (hovered) {
      body.style.cursor = "pointer"
    } else {
      body.style.cursor = "default"
    }
  })

  useFrame(() => {
    if (mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1, 1, 1] : [0.5, 0.5, 0.5]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "steelblue" : "lightgreen"} />
    </mesh>
  )
}

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>

      <Canvas className="bg-black">
        <ambientLight args={["white", 0.1]} />
        <pointLight position={[10, 10, 10]} />
        <spotLight position={[-1.5, -1.5, -1]} color="red" />
        <axesHelper args={[3]} />
        <Box position={[-1, 0, 0]} />
        <Box position={[1, 0, 0]} />
      </Canvas>
    </Layout>
  )
}
