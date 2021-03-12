import { useThree } from "react-three-fiber"
import { useGLTF } from "@react-three/drei"
import {
  CubeTextureLoader,
  Mesh,
  MeshStandardMaterial,
  ReinhardToneMapping,
  sRGBEncoding,
} from "three"
import { useEffect, useRef } from "react"

export function Scene() {
  const three = useThree()

  const cubeTextureLoader = new CubeTextureLoader()
  const envMapTexture = cubeTextureLoader.load([
    "/textures/environmentMaps/2/px.jpg",
    "/textures/environmentMaps/2/nx.jpg",
    "/textures/environmentMaps/2/py.jpg",
    "/textures/environmentMaps/2/ny.jpg",
    "/textures/environmentMaps/2/pz.jpg",
    "/textures/environmentMaps/2/nz.jpg",
  ])
  envMapTexture.encoding = sRGBEncoding
  three.scene.background = envMapTexture
  three.scene.environment = envMapTexture

  three.gl.physicallyCorrectLights = true
  three.gl.outputEncoding = sRGBEncoding
  three.gl.toneMapping = ReinhardToneMapping

  const { scene } = useGLTF("/models/DamagedHelmet/glTF/DamagedHelmet.gltf")
  scene.scale.set(2, 2, 2)
  scene.rotation.y = Math.PI * 0.5
  three.scene.add(scene)

  const directionalLightRef = useRef(null)
  useEffect(() => {
    const directionalLight = directionalLightRef.current
    if (directionalLight) {
      directionalLight.shadow.mapSize.set(1024, 1024)
      directionalLight.shadow.camera.far = 15
      directionalLight.shadow.normalBias = 0.05
    }
  })

  return (
    <>
      <directionalLight
        args={["hotpink"]}
        castShadow={true}
        position={[0.25, 3, -2.25]}
        ref={directionalLightRef}
      />
    </>
  )
}
