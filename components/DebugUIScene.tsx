import { Controls, useControl } from "react-three-gui"
import { useRef, useState } from "react"
import OrbitControls from "./OrbitControls"
import gsap from "gsap"

function rgba(c: { r: number; g: number; b: number; a: number } | string) {
  if (typeof c === "object") {
    return `rgba(${c.r},${c.g},${c.b},${c.a || 1})`
  }
  return c
}

const Scene = () => {
  const [color, setColor] = useState("#FF0000")
  useControl("Box Color", {
    type: "color",
    inline: true,
    state: [color, (c) => setColor(rgba(c))],
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
        <meshBasicMaterial color={color} wireframe={wireframe} />
      </mesh>
      <OrbitControls />
    </>
  )
}

export default function DebugUIScene() {
  return (
    <Controls.Provider>
      <Controls.Canvas className="bg-black">
        <Scene />
      </Controls.Canvas>
      <Controls title="Parameter UI" anchor="bottom_left" />
    </Controls.Provider>
  )
}
