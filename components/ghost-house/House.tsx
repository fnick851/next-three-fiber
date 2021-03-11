import { useRef } from "react"
import { Walls } from "./Walls"
import { Roof } from "./Roof"
import { Door } from "./Door"
import { Bushes } from "./Bushes"
import { useLightShadowConfigs } from "../../hooks/useLightShadowConfigs"

export function House() {
  const doorLightRef = useRef(null)
  useLightShadowConfigs(doorLightRef)

  return (
    <>
      <group position={[0, 0.001, 0]}>
        <Walls />
        <Roof />
        <Door />
        <Bushes />
        <pointLight
          args={["#ff7d46", 1, 7]}
          castShadow={true}
          position={[0, 2.2, 2.7]}
          ref={doorLightRef}
        />
      </group>
    </>
  )
}
