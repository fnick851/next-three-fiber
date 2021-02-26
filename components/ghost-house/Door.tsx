import { useLoader } from "react-three-fiber"
import { TextureLoader } from "three"
import useUV2 from "../../hooks/useUV2"

export default function Door() {
  const doorColorTexture = useLoader(
    TextureLoader,
    "/textures/ghost-house/door/color.jpg"
  )
  const doorAlphaTexture = useLoader(
    TextureLoader,
    "/textures/ghost-house/door/alpha.jpg"
  )
  const doorAmbientOcclusionTexture = useLoader(
    TextureLoader,
    "/textures/ghost-house/door/ambientOcclusion.jpg"
  )
  const doorHeightTexture = useLoader(
    TextureLoader,
    "/textures/ghost-house/door/height.jpg"
  )
  const doorNormalTexture = useLoader(
    TextureLoader,
    "/textures/ghost-house/door/normal.jpg"
  )
  const doorMetalnessTexture = useLoader(
    TextureLoader,
    "/textures/ghost-house/door/metalness.jpg"
  )
  const doorRoughnessTexture = useLoader(
    TextureLoader,
    "/textures/ghost-house/door/roughness.jpg"
  )

  const geomRef = useUV2()

  return (
    <mesh position={[0, 1, 2 + 0.01]}>
      <planeGeometry args={[2, 2, 100, 100]} ref={geomRef} />
      <meshStandardMaterial
        map={doorColorTexture}
        transparent={true}
        alphaMap={doorAlphaTexture}
        aoMap={doorAmbientOcclusionTexture}
        displacementMap={doorHeightTexture}
        displacementScale={0.1}
        normalMap={doorNormalTexture}
        metalnessMap={doorMetalnessTexture}
        roughnessMap={doorRoughnessTexture}
      />
    </mesh>
  )
}
