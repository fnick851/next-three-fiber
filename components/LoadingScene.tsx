import { useRef } from "react"
import { useFrame } from "react-three-fiber"
import { Html } from "@react-three/drei"

export function LoadingScene() {
  const meshRef = useRef(null)
  const speed = 0.05
  const maxScale = 1.5
  const minScale = 0.1
  let direction = "up"
  useFrame(() => {
    const circle = meshRef.current
    if (circle) {
      if (circle.scale.x > maxScale) {
        direction = "down"
      }
      if (circle.scale.x < minScale) {
        direction = "up"
      }
      if (direction === "up") {
        circle.scale.x += speed
        circle.scale.y += speed
      }
      if (direction === "down") {
        circle.scale.x -= speed
        circle.scale.y -= speed
      }
    }
  })

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[0.03]} />
      <meshBasicMaterial />
      <Html>
        <p
          style={{
            fontSize: "12px",
            color: "white",
            transform: "translate(13px, -9px)",
          }}
        >
          loading...
        </p>
      </Html>
    </mesh>
  )
}
