import Head from "next/head"
import { Layout } from "../components/Layout"
import { Controls, useControl } from "react-three-gui"
import { useRef, useState } from "react"
import gsap from "gsap"
import { OrbitControls } from "@react-three/drei"

function Scene() {
  const [color, setColor] = useState("rgba(32,130,190)")
  const [alpha, setAlpha] = useState(0.2)

  useControl("Box Color", {
    type: "color",
    inline: true,
    state: [
      color.replace(")", ",") + `${alpha})`,
      (c) => {
        setColor(`rgba(${c.r},${c.g},${c.b})`)
        setAlpha(c.a)
      },
    ],
  })

  const visibility = useControl("Visible", { type: "boolean", value: true })
  const wireframe = useControl("Wireframe", { type: "boolean", value: false })

  const mesh = useRef(null)
  useControl("Spin", {
    type: "button",
    onClick: () => {
      gsap
        .to(mesh.current.rotation, {
          y: mesh.current.rotation.y + Math.PI * 2,
        })
        .duration(1)
    },
  })

  const posY = useControl("Elevation", { type: "number", min: -3, max: 3 })

  return (
    <>
      <mesh ref={mesh} position={[0, posY, 0]} visible={visibility}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color={color}
          transparent={true}
          opacity={alpha}
          wireframe={wireframe}
        />
      </mesh>
      {
        //@ts-ignore
        <OrbitControls />
      }
    </>
  )
}

export default function DebugUI() {
  return (
    <Layout>
      <Head>
        <title>Debug UI</title>
      </Head>

      <Controls.Provider>
        <Controls.Canvas className="bg-black">
          <Scene />
        </Controls.Canvas>
        <Controls title="Parameter Control" anchor="bottom_left" />
      </Controls.Provider>
    </Layout>
  )
}
