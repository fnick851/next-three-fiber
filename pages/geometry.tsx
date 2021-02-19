import Head from "next/head"
import dynamic from "next/dynamic"
import { Canvas, useUpdate } from "react-three-fiber"
import Layout from "../components/Layout"
import { BufferAttribute, BufferGeometry } from "three"

const Control = dynamic(() => import("../components/OrbitControls"), {
  ssr: false,
})

const triangleCount = 50
const verticePerTriangle = 3
const floatPerVertice = 3
const floatCount = floatPerVertice * verticePerTriangle * triangleCount
const positionsArray = new Float32Array(floatCount)
for (let i = 0; i < floatCount; i++)
  positionsArray[i] = (Math.random() - 0.5) * 4

const Scene = () => {
  const ref = useUpdate((geometry: BufferGeometry) => {
    geometry.setAttribute(
      "position",
      new BufferAttribute(positionsArray, floatPerVertice)
    )
  }, [])

  return (
    <>
      <mesh>
        <bufferGeometry ref={ref} />
        <meshBasicMaterial color={0xff0000} wireframe={true} />
      </mesh>
      <Control />
    </>
  )
}

export default function Geometry() {
  return (
    <Layout>
      <Head>
        <title>Geometry</title>
      </Head>

      <Canvas className="bg-black">
        <Scene />
      </Canvas>
    </Layout>
  )
}
