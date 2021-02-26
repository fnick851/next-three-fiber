import Head from "next/head"
import { Layout } from "../components/Layout"
import { Suspense, useEffect, useMemo, useRef } from "react"
import { useLoader } from "react-three-fiber"
import {
  FontLoader,
  MeshMatcapMaterial,
  TextureLoader,
  TorusGeometry,
} from "three"
import { Controls, useControl } from "react-three-gui"
import { OrbitControls } from "@react-three/drei"
import { LoadingScene } from "../components/LoadingScene"

function Scene() {
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
      {
        //@ts-ignore
        <OrbitControls />
      }
    </>
  )
}

export default function ThreeDText() {
  return (
    <Layout>
      <Head>
        <title>3D Text</title>
      </Head>

      <Controls.Provider>
        <Controls.Canvas className="bg-black">
          <Suspense fallback={<LoadingScene />}>
            <Scene />
          </Suspense>
        </Controls.Canvas>
        <Controls
          collapsed={false}
          title="Parameter Control"
          anchor="bottom_left"
        />
      </Controls.Provider>
    </Layout>
  )
}
