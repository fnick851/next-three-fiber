import Head from "next/head"
import { Canvas, useFrame, useLoader, useThree } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls, useGLTF, Loader } from "@react-three/drei"
import {
  ACESFilmicToneMapping,
  CubeTextureLoader,
  DoubleSide,
  Mesh,
  MeshDepthMaterial,
  MeshStandardMaterial,
  RGBADepthPacking,
  sRGBEncoding,
  TextureLoader,
} from "three"
import { Suspense, useEffect, useRef } from "react"

function Scene() {
  const three = useThree()

  // env
  const cubeTextureLoader = new CubeTextureLoader()
  const envMapTexture = cubeTextureLoader.load([
    "/textures/environmentMaps/3/px.jpg",
    "/textures/environmentMaps/3/nx.jpg",
    "/textures/environmentMaps/3/py.jpg",
    "/textures/environmentMaps/3/ny.jpg",
    "/textures/environmentMaps/3/pz.jpg",
    "/textures/environmentMaps/3/nz.jpg",
  ])
  envMapTexture.encoding = sRGBEncoding
  three.scene.background = envMapTexture
  three.scene.environment = envMapTexture

  // textures
  const mapTexture = useLoader(TextureLoader, "/models/LeePerrySmith/color.jpg")
  mapTexture.encoding = sRGBEncoding
  const normalTexture = useLoader(
    TextureLoader,
    "/models/LeePerrySmith/normal.jpg"
  )

  // materials
  const customUniforms = {
    uTime: { value: 0 },
  }
  const material = new MeshStandardMaterial({
    map: mapTexture,
    normalMap: normalTexture,
  })
  const depthMaterial = new MeshDepthMaterial({
    depthPacking: RGBADepthPacking,
  })

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = customUniforms.uTime
    shader.vertexShader = shader.vertexShader.replace(
      /*glsl*/ `#include <common>`,
      /*glsl*/ `
          #include <common>

          uniform float uTime;

          mat2 get2dRotateMatrix(float _angle)
          {
              return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
          }
      `
    )
    shader.vertexShader = shader.vertexShader.replace(
      /*glsl*/ `#include <beginnormal_vertex>`,
      /*glsl*/ `
          #include <beginnormal_vertex>

          float angle = (sin(position.y + uTime)) * 0.4;
          mat2 rotateMatrix = get2dRotateMatrix(angle);

          objectNormal.xz = rotateMatrix * objectNormal.xz;
      `
    )
    shader.vertexShader = shader.vertexShader.replace(
      /*glsl*/ `#include <begin_vertex>`,
      /*glsl*/ `
          #include <begin_vertex>

          transformed.xz = rotateMatrix * transformed.xz;
      `
    )
  }
  depthMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = customUniforms.uTime
    shader.vertexShader = shader.vertexShader.replace(
      /*glsl*/ `#include <common>`,
      /*glsl*/ `
          #include <common>

          uniform float uTime;

          mat2 get2dRotateMatrix(float _angle)
          {
              return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
          }
      `
    )
    shader.vertexShader = shader.vertexShader.replace(
      /*glsl*/ `#include <begin_vertex>`,
      /*glsl*/ `
          #include <begin_vertex>

          float angle = (sin(position.y + uTime)) * 0.4;
          mat2 rotateMatrix = get2dRotateMatrix(angle);

          transformed.xz = rotateMatrix * transformed.xz;
      `
    )
  }

  const gltf = useGLTF("/models/LeePerrySmith/LeePerrySmith.glb")
  const mesh = gltf.scene.children[0]
  if (mesh) {
    mesh.rotation.y = Math.PI * 0.5
    //@ts-ignore
    mesh.material = material
    mesh.customDepthMaterial = depthMaterial
  }
  useEffect(() => {
    three.scene.traverse((child) => {
      if (
        child instanceof Mesh &&
        child.material instanceof MeshStandardMaterial
      ) {
        child.material.envMapIntensity = 5
        child.material.needsUpdate = true
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  })

  three.gl.physicallyCorrectLights = true
  three.gl.outputEncoding = sRGBEncoding
  three.gl.toneMapping = ACESFilmicToneMapping
  three.gl.toneMappingExposure = 1

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    customUniforms.uTime.value = elapsedTime
  })

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
      <primitive object={mesh} />
      <mesh position={[0, -6, 7]} rotation={[Math.PI, 0, 0]}>
        <planeGeometry args={[15, 15, 15]} />
        <meshStandardMaterial side={DoubleSide} />
      </mesh>
      <ambientLight color="hotpink" />
      <directionalLight
        args={["#ffffff", 3]}
        castShadow={true}
        position={[0.25, 2, -2.25]}
        ref={directionalLightRef}
      />
    </>
  )
}

export default function MorphingHead() {
  return (
    <Layout>
      <Head>
        <title>Morphing Head - three.js journey r3f</title>
      </Head>

      <Loader />
      <Canvas
        className="bg-black"
        shadowMap={true}
        camera={{ position: [10, 0, -10] }}
      >
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </Layout>
  )
}
