import Head from "next/head"
import { useMemo } from "react"
import { Canvas } from "react-three-fiber"
import { BoxBufferGeometry, MeshBasicMaterial } from "three"
import { Layout } from "../components/Layout"
import { OrbitControls } from "@react-three/drei"

export default function Transform() {
  const boxPositions = [-1.5, 0, 1.5]
  const geo = useMemo(() => new BoxBufferGeometry(1, 1, 1), [])
  const mat = useMemo(() => new MeshBasicMaterial({ color: 0x0d5dcb }), [])
  const boxMeshes = boxPositions.map((pos, i) => (
    <mesh geometry={geo} material={mat} position={[pos, 0, 0]} key={i} />
  ))

  return (
    <Layout>
      <Head>
        <title>Transform - three.js journey r3f</title>
      </Head>

      <Canvas className="bg-black">
        <axesHelper args={[2]} />
        <group scale={[1, 2, 1]} rotation={[0, 0.2, 0]}>
          {boxMeshes}
        </group>
        <OrbitControls />
      </Canvas>
    </Layout>
  )
}
