import dynamic from "next/dynamic"
import Head from "next/head"
import { Suspense } from "react"
import Layout from "../components/Layout"
import LoadingScene from "../components/LoadingScene"
import { useEffect, useMemo, useRef } from "react"
import { useLoader } from "react-three-fiber"
import {
  FontLoader,
  MeshMatcapMaterial,
  TextureLoader,
  TorusGeometry,
} from "three"
import { Controls, useControl } from "react-three-gui"

function ThreeDTextScene() {
  const matCapTextureFile = useControl("Texture", {
    type: "select",
    items: ["1", "2", "3", "4", "5", "6", "7", "8"],
  })
  const matCapTexture = useLoader(
    TextureLoader,
    `/textures/matcaps/${matCapTextureFile}.png`
  )
  const material = useMemo(
    () => new MeshMatcapMaterial({ matcap: matCapTexture }),
    [matCapTexture]
  )
  const donutGeometry = useMemo(() => new TorusGeometry(0.3, 0.2, 32, 64), [])
  const font = useLoader(FontLoader, "/fonts/helvetiker_regular.typeface.json")

  const donutsList = new Array(100).fill(0)
  const donuts = donutsList.map((_, i) => {
    const scale = Math.random()
    return (
      <mesh
        geometry={donutGeometry}
        material={material}
        key={i}
        position={[
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        ]}
        rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        scale={[scale, scale, scale]}
      ></mesh>
    )
  })

  const textRef = useRef(null)
  useEffect(() => {
    textRef.current.center()
  })
  const text = (
    <mesh>
      <meshMatcapMaterial matcap={matCapTexture} />
      <textBufferGeometry
        args={[
          "hello",
          {
            font,
            size: 0.5,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5,
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
    </>
  )
}

const OrbitControls = dynamic(() => import("../components/OrbitControls"), {
  ssr: false,
})

export default function ThreeDText() {
  return (
    <Layout>
      <Head>
        <title>3D Text</title>
      </Head>

      <Controls.Provider>
        <Controls.Canvas className="bg-black">
          <Suspense fallback={<LoadingScene />}>
            <ThreeDTextScene />
            <OrbitControls />
          </Suspense>
        </Controls.Canvas>
        <Controls title="Parameter Control" anchor="bottom_left" />
      </Controls.Provider>
    </Layout>
  )
}
