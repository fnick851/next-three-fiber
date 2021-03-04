import { useRef } from "react"
import { useFrame } from "react-three-fiber"
import { Html } from "@react-three/drei"

export function LoadingScene() {
  return (
    <Html>
      <p
        style={{
          fontSize: "12px",
          color: "white",
        }}
      >
        loading...
      </p>
    </Html>
  )
}
