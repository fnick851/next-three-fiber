import Head from "next/head"
import { Canvas, useFrame, useLoader, useUpdate } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls, Loader } from "@react-three/drei"
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  TextureLoader,
} from "three"
import { Suspense } from "react"
import { useControls, Leva } from "leva"

function Scene() {
  const { particle_style } = useControls({
    particle_style: {
      value: "8.png",
      options: {
        "1.png": "1.png",
        "2.png": "2.png",
        "3.png": "3.png",
        "4.png": "4.png",
        "5.png": "5.png",
        "6.png": "6.png",
        "7.png": "7.png",
        "8.png": "8.png",
        "9.png": "9.png",
        "10.png": "10.png",
        "11.png": "11.png",
        "12.png": "12.png",
        "13.png": "13.png",
      },
    },
  })

  const particleTexture = useLoader(
    TextureLoader,
    `/textures/particles/${particle_style}`
  )

  const count = 15000
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
  }

  const particlesGeomRef = useUpdate((geometry: BufferGeometry) => {
    geometry.setAttribute("position", new BufferAttribute(positions, 3))
    geometry.setAttribute("color", new BufferAttribute(colors, 3))
  }, [])

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    const particlesGeometry = particlesGeomRef.current
    if (particlesGeometry) {
      const geomPos = particlesGeometry.attributes.position
      for (let i = 0; i < count; i++) {
        const x = geomPos.getX(i)
        geomPos.setY(i, Math.tan(elapsedTime + x))
      }
      geomPos.needsUpdate = true
    }
  })

  return (
    <points>
      <bufferGeometry ref={particlesGeomRef} />
      <pointsMaterial
        size={0.1}
        sizeAttenuation={true}
        color={"#ff88cc"}
        transparent={true}
        alphaMap={particleTexture}
        depthWrite={false}
        blending={AdditiveBlending}
        vertexColors={true}
      />
    </points>
  )
}

export default function Particles() {
  return (
    <Layout>
      <Head>
        <title>Particles - Three.js Journey to R3F</title>
      </Head>

      <Loader />
      <Leva oneLineLabels={true} />
      <Canvas className="bg-black">
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </Layout>
  )
}
