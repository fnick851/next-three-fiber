import { useRef } from "react"
import { useLightShadowConfigs } from "../../hooks/useLightShadowConfigs"

export function Lights() {
  const moonLightRef = useRef(null)
  useLightShadowConfigs(moonLightRef)

  return (
    <group>
      <ambientLight args={["#b9d5ff", 0.3]} />
      <directionalLight
        ref={moonLightRef}
        args={["#b9d5ff", 0.12]}
        position={[4, 5, -2]}
        castShadow={true}
      />
    </group>
  )
}
