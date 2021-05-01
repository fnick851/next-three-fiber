import Head from "next/head"
import { Canvas } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls } from "@react-three/drei"
import { useControls, Leva } from "leva"
import { useEffect, useRef } from "react"
import { AdditiveBlending, BufferAttribute, Color } from "three"

function Scene() {
  const {
    star_count,
    star_size,
    galaxy_radius,
    galaxy_spin,
    galaxy_branches,
    galaxy_random_power,
    galaxy_randomness,
    inside_color,
    outside_color,
  } = useControls({
    star_count: {
      value: 100000,
      min: 10000,
      max: 500000,
      step: 10000,
    },
    star_size: {
      value: 0.01,
      min: 0.001,
      max: 0.1,
      step: 0.001,
    },
    galaxy_radius: {
      value: 5,
      min: 1,
      max: 20,
      step: 1,
    },
    galaxy_spin: {
      value: 1,
      min: -5,
      max: 5,
      step: 1,
    },
    galaxy_branches: {
      value: 4,
      min: 1,
      max: 20,
      step: 1,
    },
    galaxy_random_power: {
      value: 3,
      min: 1,
      max: 10,
      step: 0.1,
    },
    galaxy_randomness: {
      value: 0.2,
      min: 0,
      max: 2,
      step: 0.01,
    },
    inside_color: "#00b2ff",
    outside_color: "#ff0000",
  })

  const geomRef = useRef(null)

  const positions = new Float32Array(star_count * 3)
  const colors = new Float32Array(star_count * 3)

  const colorInside = new Color(inside_color)
  const colorOutside = new Color(outside_color)

  for (let i = 0; i < star_count; i++) {
    const i3 = i * 3

    const radius = Math.random() * galaxy_radius

    const spinAngle = radius * galaxy_spin
    const branchAngle = ((i % galaxy_branches) / galaxy_branches) * Math.PI * 2

    const randomX =
      Math.pow(Math.random(), galaxy_random_power) *
      (Math.random() < 0.5 ? 1 : -1) *
      galaxy_randomness *
      radius
    const randomY =
      Math.pow(Math.random(), galaxy_random_power) *
      (Math.random() < 0.5 ? 1 : -1) *
      galaxy_randomness *
      radius
    const randomZ =
      Math.pow(Math.random(), galaxy_random_power) *
      (Math.random() < 0.5 ? 1 : -1) *
      galaxy_randomness *
      radius

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
    positions[i3 + 1] = randomY
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / galaxy_radius)

    colors[i3] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
  }

  useEffect(() => {
    const geom = geomRef.current
    if (geom) {
      geom.setAttribute("position", new BufferAttribute(positions, 3))
      geom.setAttribute("color", new BufferAttribute(colors, 3))
    }
  })

  return (
    <>
      <points>
        <bufferGeometry ref={geomRef} />
        <pointsMaterial
          size={star_size}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors={true}
          blending={AdditiveBlending}
        />
      </points>
    </>
  )
}

export default function Galaxy() {
  return (
    <Layout>
      <Head>
        <title>Galaxy - three.js journey r3f</title>
      </Head>

      <Leva oneLineLabels={true} />
      <Canvas className="bg-black">
        <Scene />
        <OrbitControls />
      </Canvas>
    </Layout>
  )
}
