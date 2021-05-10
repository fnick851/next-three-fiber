import Head from "next/head"
import { Canvas } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls } from "@react-three/drei"
import { DoubleSide, ShaderMaterial } from "three"
import { vertexShader } from "../components/shader-patterns/vertex.glsl"
import { fragmentShader } from "../components/shader-patterns/fragment.glsl"
import { useControls } from "leva"

export default function ShaderPatterns() {
  const { pattern, monochromic } = useControls({
    pattern: {
      value: 0,
      step: 1,
      min: 0,
      max: 49,
    },
    monochromic: { value: false, render: (get) => get("pattern") > 1 },
  })

  const frag = fragmentShader(pattern, monochromic)
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader: frag,
    side: DoubleSide,
  })

  return (
    <Layout>
      <Head>
        <title>Shader Patterns - Three.js Journey R3F</title>
      </Head>

      <Canvas className="bg-black">
        <mesh material={material}>
          <planeGeometry args={[5, 5, 32, 32]} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </Layout>
  )
}
