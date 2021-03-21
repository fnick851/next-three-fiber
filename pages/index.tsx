import Head from "next/head"
import { useRef, useState } from "react"
import { Canvas, MeshProps, useFrame } from "react-three-fiber"
import { Mesh } from "three"
import { Layout } from "../components/Layout"
import { OrbitControls } from "@react-three/drei"
import { Texts } from "../components/Texts"
import { useBodyPointerCursor } from "../hooks/useBodyPointerCursor"

function ClickableBox(props: MeshProps) {
  const meshRef = useRef<Mesh>()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useBodyPointerCursor(hovered)

  useFrame(() => {
    const mesh = meshRef.current
    if (mesh) mesh.rotation.x = mesh.rotation.y += 0.01
  })

  return (
    <mesh
      {...props}
      ref={meshRef}
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
        <Texts position={[-1, 2, 0]}>
          <p>welcome :)</p>
          <br />
          <p>
            <strong>please click upper left corner to open menu.</strong>
          </p>
          <br />

          <div style={{ color: "#6395ed" }}>
            <p>drag with left mouse button to rotate,</p>
            <p>drag with right mouse button to pan,</p>
            <p>drag with middle mouse button, or scroll, to zoom,</p>
            <p>some objects are clickable too.</p>
          </div>
        </Texts>
        <ClickableBox position={[-1, 0, 0]} />
        <ClickableBox position={[1, 0, 0]} />
        <axesHelper args={[3]} />
        <ambientLight args={["#FF1493", 0.1]} />
        <pointLight position={[10, 10, 10]} color="#9400D3" />
        <spotLight position={[-1.5, -1.5, -1]} color="#6495ED" />
        <OrbitControls />
      </Canvas>
    </Layout>
  )
}
