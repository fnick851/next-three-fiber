import Head from "next/head"
import { Canvas, useFrame, useThree } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls } from "@react-three/drei"
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  ShaderMaterial,
} from "three"
import { useControls, Leva } from "leva"
import { vertexShader } from "../components/shader-galaxy/vertex.glsl"
import { fragmentShader } from "../components/shader-galaxy/fragment.glsl"

function Scene() {
  const {
    count,
    radius,
    branches,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor,
    starStyle,
  } = useControls({
    count: { value: 200000, step: 100, min: 100, max: 1000000 },
    radius: { value: 5, step: 0.01, min: 0.01, max: 20 },
    branches: { value: 3, step: 1, min: 2, max: 20 },
    randomness: { value: 0.2, step: 0.001, min: 0, max: 2 },
    randomnessPower: { value: 3, step: 0.001, min: 1, max: 10 },
    insideColor: "#ff6030",
    outsideColor: "#1b3984",
    starStyle: {
      value: 2,
      options: {
        disc: 0,
        diffuse_point: 1,
        light_point: 2,
      },
    },
  })

  const geometry = new BufferGeometry()

  const positionsArr = new Float32Array(count * 3)
  const randomnessArr = new Float32Array(count * 3)
  const colorsArr = new Float32Array(count * 3)
  const scalesArr = new Float32Array(count * 1)
  const inColor = new Color(insideColor)
  const outColor = new Color(outsideColor)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3

    // Position
    const r = Math.random() * radius
    const branchAngle = ((i % branches) / branches) * Math.PI * 2
    const randomX =
      Math.pow(Math.random(), randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      randomness *
      r
    const randomY =
      Math.pow(Math.random(), randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      randomness *
      r
    const randomZ =
      Math.pow(Math.random(), randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      randomness *
      r
    positionsArr[i3] = Math.cos(branchAngle) * r
    positionsArr[i3 + 1] = 0
    positionsArr[i3 + 2] = Math.sin(branchAngle) * r
    randomnessArr[i3] = randomX
    randomnessArr[i3 + 1] = randomY
    randomnessArr[i3 + 2] = randomZ

    // Color
    const mixedColor = inColor.clone()
    mixedColor.lerp(outColor, r / radius)
    colorsArr[i3] = mixedColor.r
    colorsArr[i3 + 1] = mixedColor.g
    colorsArr[i3 + 2] = mixedColor.b

    // Scale
    scalesArr[i] = Math.random()
  }

  geometry.setAttribute("position", new BufferAttribute(positionsArr, 3))
  geometry.setAttribute("aRandomness", new BufferAttribute(randomnessArr, 3))
  geometry.setAttribute("color", new BufferAttribute(colorsArr, 3))
  geometry.setAttribute("aScale", new BufferAttribute(scalesArr, 1))

  const { gl } = useThree()
  const material = new ShaderMaterial({
    depthWrite: false,
    blending: AdditiveBlending,
    vertexColors: true,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 30 * gl.getPixelRatio() },
    },
    vertexShader,
    fragmentShader: fragmentShader(starStyle),
  })

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    material.uniforms.uTime.value = elapsedTime
  })

  return <points material={material} geometry={geometry} />
}

export default function ShaderGalaxy() {
  return (
    <Layout>
      <Head>
        <title>Shader Galaxy - Three.js Journey R3F</title>
      </Head>

      <Leva oneLineLabels={true} />
      <Canvas className="bg-black" camera={{ position: [0, 2, 2] }}>
        <Scene />
        <OrbitControls />
      </Canvas>
    </Layout>
  )
}
