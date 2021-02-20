import dynamic from "next/dynamic"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import { Canvas, MeshProps, useFrame } from "react-three-fiber"
import { Mesh } from "three"
import Layout from "../components/Layout"

function ClickableBox(props: MeshProps) {
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

const Texts = dynamic(() => import("../components/Texts"), { ssr: false })

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>

      <Canvas className="bg-black">
        <Texts position={[-2, 3, 0]}>
          <p>Hi,</p>
          <p>objects on the site might be interactive,</p>
          <p>please try clicking and dragging.</p>
        </Texts>
        <ClickableBox position={[-1, 0, 0]} />
        <ClickableBox position={[1, 0, 0]} />
        <axesHelper args={[3]} />
        <ambientLight args={["white", 0.1]} />
        <pointLight position={[10, 10, 10]} />
        <spotLight position={[-1.5, -1.5, -1]} color="red" />
      </Canvas>
    </Layout>
  )
}
