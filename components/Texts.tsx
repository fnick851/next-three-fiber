import { Html } from "@react-three/drei"
import { ReactNode } from "react"

export function Texts(props: {
  position: [x: number, y: number, y: number]
  children: ReactNode
}) {
  return (
    <mesh position={props.position}>
      <planeGeometry />
      <meshBasicMaterial transparent={true} opacity={0} />
      <Html center style={{ color: "hotpink", width: 350 }}>
        {props.children}
      </Html>
    </mesh>
  )
}
