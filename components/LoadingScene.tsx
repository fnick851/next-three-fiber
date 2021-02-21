import { useRef } from "react"
import { useFrame } from "react-three-fiber"

export default function LoadingScene() {
  const meshRef = useRef(null)
  const speed = 0.05
  const maxScale = 2
  const minScale = 0.5
  let direction = "up"
  useFrame(() => {
    if (meshRef.current) {
      if (meshRef.current.scale.x > maxScale) {
        direction = "down"
      }
      if (meshRef.current.scale.x < minScale) {
        direction = "up"
      }
      if (direction === "up") {
        meshRef.current.scale.x += speed
        meshRef.current.scale.y += speed
      }
      if (direction === "down") {
        meshRef.current.scale.x -= speed
        meshRef.current.scale.y -= speed
      }
    }
  })

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[0.05, 15]} />
      <meshBasicMaterial />
    </mesh>
  )
}
