import Head from "next/head"
import { Canvas, useThree } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls, useGLTF, Loader } from "@react-three/drei"
import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  CubeTextureLoader,
  LinearToneMapping,
  Mesh,
  MeshStandardMaterial,
  NoToneMapping,
  ReinhardToneMapping,
  sRGBEncoding,
} from "three"
import { Suspense, useEffect, useRef } from "react"
import { useControls, Leva } from "leva"

function Scene() {
  const {
    toneMapping,
    toneMappingExposure,
    rotation,
    envMapIntensity,
    directionalLightIntensity,
    directionalLightPos_X,
    directionalLightPos_Y,
    directionalLightPos_Z,
  } = useControls({
    toneMapping: {
      value: ReinhardToneMapping,
      options: {
        No: NoToneMapping,
        Linear: LinearToneMapping,
        Reinhard: ReinhardToneMapping,
        Cineon: CineonToneMapping,
        ACESFilmic: ACESFilmicToneMapping,
      },
    },
    toneMappingExposure: {
      value: 3,
      min: 0,
      max: 10,
      step: 0.001,
    },
    rotation: {
      value: Math.PI * 0.5,
      min: -Math.PI,
      max: Math.PI,
      step: 0.001,
    },
    envMapIntensity: {
      value: 5,
      min: 0,
      max: 20,
      step: 0.001,
    },
    directionalLightIntensity: {
      value: 3,
      min: 0,
      max: 10,
      step: 0.001,
    },
    directionalLightPos_X: {
      value: 0.25,
      min: -5,
      max: 5,
      step: 0.001,
    },
    directionalLightPos_Y: {
      value: 3,
      min: -5,
      max: 5,
      step: 0.001,
    },
    directionalLightPos_Z: {
      value: -2.25,
      min: -5,
      max: 5,
      step: 0.001,
    },
  })

  const cubeTextureLoader = new CubeTextureLoader()
  const envMapTexture = cubeTextureLoader.load([
    "/textures/environmentMaps/1/px.jpg",
    "/textures/environmentMaps/1/nx.jpg",
    "/textures/environmentMaps/1/py.jpg",
    "/textures/environmentMaps/1/ny.jpg",
    "/textures/environmentMaps/1/pz.jpg",
    "/textures/environmentMaps/1/nz.jpg",
  ])
  envMapTexture.encoding = sRGBEncoding

  const three = useThree()
  three.scene.background = envMapTexture
  three.scene.environment = envMapTexture
  three.scene.traverse((child) => {
    if (
      child instanceof Mesh &&
      child.material instanceof MeshStandardMaterial
    ) {
      child.material.envMapIntensity = envMapIntensity
      child.material.needsUpdate = true
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  three.gl.physicallyCorrectLights = true
  three.gl.outputEncoding = sRGBEncoding
  three.gl.toneMapping = toneMapping
  three.gl.toneMappingExposure = toneMappingExposure

  const { scene } = useGLTF("/models/FlightHelmet/glTF/FlightHelmet.gltf")
  scene.scale.set(10, 10, 10)
  scene.position.set(0, -4, 0)
  scene.rotation.y = rotation
  three.scene.add(scene)

  const directionalLightRef = useRef(null)
  useEffect(() => {
    const directionalLight = directionalLightRef.current
    if (directionalLight) {
      directionalLight.shadow.camera.far = 15
      directionalLight.shadow.mapSize.set(1024, 1024)
      directionalLight.shadow.normalBias = 0.05
    }
  })

  return (
    <directionalLight
      args={["#ffffff", directionalLightIntensity]}
      castShadow={true}
      position={[
        directionalLightPos_X,
        directionalLightPos_Y,
        directionalLightPos_Z,
      ]}
      ref={directionalLightRef}
    />
  )
}

export default function RealisticHelmet() {
  return (
    <Layout>
      <Head>
        <title>Realistic Helmet - Three.js Journey to R3F</title>
      </Head>

      <Loader />
      <Leva oneLineLabels={true} />
      <Canvas
        className="bg-black"
        camera={{ position: [4, 1, -4] }}
        shadowMap={true}
      >
        <Suspense fallback={null}>
          <Scene />
          <ambientLight intensity={0.1} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </Layout>
  )
}
