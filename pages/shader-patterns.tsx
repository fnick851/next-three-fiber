import Head from "next/head"
import { Canvas } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls } from "@react-three/drei"
import { DoubleSide, ShaderMaterial } from "three"
import { useEffect, useRef } from "react"
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

  const ref = useRef(null)

  const frag = fragmentShader(pattern, monochromic)
  const material = new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: frag,
    side: DoubleSide,
  })

  useEffect(() => {
    const plane = ref.current
    if (plane) {
      plane.material = material
    }
  })

  return (
    <Layout>
      <Head>
        <title>Shader Patterns</title>
      </Head>

      <Canvas className="bg-black">
        <mesh ref={ref}>
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader(0, false)}
          />
          <planeGeometry args={[5, 5, 32, 32]} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </Layout>
  )
}
