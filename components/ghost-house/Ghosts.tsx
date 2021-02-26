import { useRouter } from "next/router"
import { useRef } from "react"
import { useFrame } from "react-three-fiber"

export default function Ghosts() {
  const ghost1Ref = useRef(null)
  const ghost2Ref = useRef(null)
  const ghost3Ref = useRef(null)

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()

    const ghost1 = ghost1Ref.current
    const ghost2 = ghost2Ref.current
    const ghost3 = ghost3Ref.current

    if (ghost1 && ghost2 && ghost3) {
      const ghost1Angle = elapsedTime * 0.5
      ghost1.position.x = Math.cos(ghost1Angle) * 4
      ghost1.position.z = Math.sin(ghost1Angle) * 4
      ghost1.position.y = Math.sin(elapsedTime * 3)

      const ghost2Angle = -elapsedTime * 0.32
      ghost2.position.x = Math.cos(ghost2Angle) * 5
      ghost2.position.z = Math.sin(ghost2Angle) * 5
      ghost2.position.y =
        Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

      const ghost3Angle = -elapsedTime * 0.18
      ghost3.position.x =
        Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
      ghost3.position.z =
        Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
      ghost3.position.y =
        Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)
    }
  })

  return (
    <>
      <pointLight args={["#ff00ff", 3, 3]} castShadow={true} ref={ghost1Ref} />
      <pointLight args={["#00ffff", 3, 3]} castShadow={true} ref={ghost2Ref} />
      <pointLight args={["#ff7800", 3, 3]} castShadow={true} ref={ghost3Ref} />
    </>
  )
}
