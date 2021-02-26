import { useLoader } from "react-three-fiber"
import { DoubleSide, RepeatWrapping, TextureLoader } from "three"
import useUV2 from "../../hooks/useUV2"

export default function Land() {
  const grassColorTexture = useLoader(
    TextureLoader,
    "/textures/ghost-house/grass/color.jpg"
  )
  const grassAmbientOcclusionTexture = useLoader(
    TextureLoader,
    "/textures/ghost-house/grass/ambientOcclusion.jpg"
  )
  const grassNormalTexture = useLoader(
    TextureLoader,
    "/textures/ghost-house/grass/normal.jpg"
  )
  const grassRoughnessTexture = useLoader(
    TextureLoader,
    "/textures/ghost-house/grass/roughness.jpg"
  )

  grassColorTexture.repeat.set(8, 8)
  grassAmbientOcclusionTexture.repeat.set(8, 8)
  grassNormalTexture.repeat.set(8, 8)
  grassRoughnessTexture.repeat.set(8, 8)

  grassColorTexture.wrapS = RepeatWrapping
  grassAmbientOcclusionTexture.wrapS = RepeatWrapping
  grassNormalTexture.wrapS = RepeatWrapping
  grassRoughnessTexture.wrapS = RepeatWrapping

  grassColorTexture.wrapT = RepeatWrapping
  grassAmbientOcclusionTexture.wrapT = RepeatWrapping
  grassNormalTexture.wrapT = RepeatWrapping
  grassRoughnessTexture.wrapT = RepeatWrapping

  const geomRef = useUV2()

  return (
    <mesh
      receiveShadow={true}
      rotation={[-Math.PI * 0.5, 0, 0]}
      position={[0, 0, 0]}
    >
      <planeGeometry args={[20, 20]} ref={geomRef} />
      <meshStandardMaterial
        map={grassColorTexture}
        aoMap={grassAmbientOcclusionTexture}
        normalMap={grassNormalTexture}
        roughnessMap={grassRoughnessTexture}
        side={DoubleSide}
      />
    </mesh>
  )
}
