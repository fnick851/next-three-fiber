import Head from "next/head"
import { Canvas, useUpdate } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { BufferAttribute, BufferGeometry } from "three"
import { OrbitControls } from "@react-three/drei"

const triangleCount = 50
const verticePerTriangle = 3
const floatPerVertice = 3
const floatCount = floatPerVertice * verticePerTriangle * triangleCount
const positionsArray = new Float32Array(floatCount)
for (let i = 0; i < floatCount; i++)
  positionsArray[i] = (Math.random() - 0.5) * 4

function Scene() {
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
      {
        //@ts-ignore
        <OrbitControls />
      }
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
