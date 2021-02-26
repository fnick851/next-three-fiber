import { useLoader } from "react-three-fiber"
import { TextureLoader } from "three"
import { useUV2 } from "../../hooks/useUV2"

export function Walls() {
  const bricksColorTexture = useLoader(
    TextureLoader,
    "/textures/ghost-house/bricks/color.jpg"
  )
  const bricksAmbientOcclusionTexture = useLoader(
    TextureLoader,
    "/textures/ghost-house/bricks/ambientOcclusion.jpg"
  )
  const bricksNormalTexture = useLoader(
    TextureLoader,
    "/textures/ghost-house/bricks/normal.jpg"
  )
  const bricksRoughnessTexture = useLoader(
    TextureLoader,
    "/textures/ghost-house/bricks/roughness.jpg"
  )

  const geomRef = useUV2()

  return (
    <mesh castShadow={true} position={[0, 1.25, 0]}>
      <boxGeometry args={[4, 2.5, 4]} ref={geomRef} />
      <meshStandardMaterial
        map={bricksColorTexture}
        aoMap={bricksAmbientOcclusionTexture}
        normalMap={bricksNormalTexture}
        roughnessMap={bricksRoughnessTexture}
      />
    </mesh>
  )
}
