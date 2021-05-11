import Head from "next/head"
import { Canvas, useFrame, useLoader, useThree } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls, useHelper, Loader } from "@react-three/drei"
import { useControls, Leva } from "leva"
import { CameraHelper, DoubleSide, SpotLightHelper, TextureLoader } from "three"
import { Suspense, useEffect, useRef } from "react"

function Scene() {
  const { ambient_intensity, directional_intensity, directional_position } =
    useControls({
      ambient_intensity: 0.1,
      directional_intensity: 0.1,
      directional_position: [3, 2, 1],
    })

  const simpleShadow = useLoader(
    TextureLoader,
    "/textures/shadow/simpleShadow.jpg"
  )

  const { scene } = useThree()
  const directionalLightRef = useRef(null)
  useEffect(() => {
    const light = directionalLightRef.current
    if (light) {
      light.shadow.mapSize.width = 1024
      light.shadow.mapSize.height = 1024
      light.shadow.camera.near = 1
      light.shadow.camera.far = 6
      light.shadow.camera.top = 2
      light.shadow.camera.right = 2
      light.shadow.camera.bottom = -2
      light.shadow.camera.left = -2

      const directionalLightCameraHelper = new CameraHelper(light.shadow.camera)
      directionalLightCameraHelper.visible = true
      scene.add(directionalLightCameraHelper)
    }
  })

  const spotLightRef = useRef(null)
  useEffect(() => {
    const light = spotLightRef.current
    if (light) {
      light.shadow.mapSize.width = 1024
      light.shadow.mapSize.height = 1024
      light.shadow.camera.near = 1
      light.shadow.camera.far = 6
      light.shadow.camera.fov = 30
      scene.add(light.target)
    }
  })
  useHelper(spotLightRef, SpotLightHelper)

  const pointLightRef = useRef(null)
  useEffect(() => {
    const light = pointLightRef.current
    if (light) {
      light.shadow.mapSize.width = 1024
      light.shadow.mapSize.height = 1024
      light.shadow.camera.near = 0.1
      light.shadow.camera.far = 5

      const pointLightCameraHelper = new CameraHelper(light.shadow.camera)
      pointLightCameraHelper.visible = true
      scene.add(pointLightCameraHelper)
    }
  })

  const sphereRef = useRef(null)
  const sphereShadowRef = useRef(null)
  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    const sphere = sphereRef.current
    const sphereShadow = sphereShadowRef.current

    if (sphere && sphereShadow) {
      sphere.position.x = Math.cos(elapsedTime) * 1.5
      sphere.position.z = Math.sin(elapsedTime) * 1.5
      sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

      sphereShadow.position.x = sphere.position.x
      sphereShadow.position.z = sphere.position.z
      sphereShadow.material.opacity = 1 - Math.abs(sphere.position.y)
    }
  })

  const planePosY = -0.5
  return (
    <>
      <mesh ref={sphereRef} castShadow={true}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={"orange"} roughness={0} metalness={0} />
      </mesh>
      <mesh
        ref={sphereShadowRef}
        rotation={[-Math.PI * 0.5, 0, 0]}
        position={[0, planePosY + 0.001, 0]}
      >
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial
          color={"black"}
          transparent={true}
          alphaMap={simpleShadow}
        />
      </mesh>
      <mesh position={[0, planePosY, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial roughness={0} metalness={0} side={DoubleSide} />
      </mesh>
      <ambientLight args={[0xffffff]} intensity={ambient_intensity} />
      <directionalLight
        ref={directionalLightRef}
        args={[0xffffff]}
        intensity={directional_intensity}
        castShadow={true}
        position={directional_position}
      />
      <spotLight
        ref={spotLightRef}
        args={[0xffffff, 0.5, 5, Math.PI * 0.2]}
        castShadow={true}
        position={[0, 1, 1]}
      />
      <pointLight
        ref={pointLightRef}
        args={[0xffffff, 0.3]}
        castShadow={true}
        position={[-1, 2, 1.5]}
      />
    </>
  )
}

export default function Shadows() {
  return (
    <Layout>
      <Head>
        <title>Shadows - Three.js Journey to R3F</title>
      </Head>

      <Loader />
      <Leva oneLineLabels={true} />
      <Canvas shadowMap={true} className="bg-black">
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </Layout>
  )
}
