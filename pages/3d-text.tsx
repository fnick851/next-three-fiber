import Head from "next/head"
import { Layout } from "../components/Layout"
import { Suspense, useEffect, useMemo, useRef } from "react"
import { Canvas, useLoader } from "react-three-fiber"
import {
  FontLoader,
  MeshMatcapMaterial,
  TextureLoader,
  TorusGeometry,
} from "three"
import { OrbitControls, Loader } from "@react-three/drei"
import { useControls, Leva } from "leva"

function Scene() {
  const { matCapTextureFile } = useControls({
    matCapTextureFile: {
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
      },
    },
  })

  const matCapTexture = useLoader(
    TextureLoader,
    `/textures/matcaps/${matCapTextureFile}`
  )
  const material = useMemo(
    () => new MeshMatcapMaterial({ matcap: matCapTexture }),
    [matCapTexture]
  )
  const donutGeometry = useMemo(() => new TorusGeometry(0.3, 0.2, 32, 64), [])
  const font = useLoader(FontLoader, "/fonts/helvetiker_regular.typeface.json")

  const donuts = []
  for (let i = 0; i < 100; i++) {
    const scale = Math.random()
    donuts.push(
      <mesh
        key={i}
        geometry={donutGeometry}
        material={material}
        position={[
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        ]}
        rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        scale={[scale, scale, scale]}
      ></mesh>
    )
  }

  const textRef = useRef(null)
  useEffect(() => {
    const text = textRef.current
    if (text) text.center()
  })
  const text = (
    <mesh>
      <meshMatcapMaterial matcap={matCapTexture} />
      <textBufferGeometry
        args={[
          "hello",
          {
            font,
            size: 1,
            height: 0.5,
            curveSegments: 10,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.01,
            bevelOffset: 0,
            bevelSegments: 10,
          },
        ]}
        ref={textRef}
      />
    </mesh>
  )

  return (
    <>
      {donuts}
      {text}
      <OrbitControls />
    </>
  )
}

export default function ThreeDText() {
  return (
    <Layout>
      <Head>
        <title>3D Text - Three.js Journey to R3F</title>
      </Head>

      <Loader />
      <Leva oneLineLabels={true} />
      <Canvas className="bg-black">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </Layout>
  )
}
