import Head from "next/head"
import { Canvas, useFrame, useThree } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls, useGLTF, Loader } from "@react-three/drei"
import { Suspense } from "react"
import { AnimationMixer, DoubleSide } from "three"
import { useControls } from "leva"

function Scene() {
  const { animation } = useControls({
    animation: {
      value: 0,
      options: {
        0: 0,
        1: 1,
        2: 2,
      },
    },
  })

  const three = useThree()
  const { animations, scene } = useGLTF("/models/Fox/glTF/Fox.gltf")
  scene.scale.set(0.025, 0.025, 0.025)
  three.scene.add(scene)

  const mixer = new AnimationMixer(scene)
  const action = mixer.clipAction(animations[animation])
  action.play()

  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta)
    }
  })

  return (
    <>
      <mesh receiveShadow={true} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color={"#444444"}
          side={DoubleSide}
          metalness={0}
          roughness={0}
        />
      </mesh>
    </>
  )
}

export default function FoxModel() {
  return (
    <Layout>
      <Head>
        <title>Fox Model</title>
      </Head>

      <Loader />
      <Canvas
        className="bg-black"
        shadowMap={true}
        camera={{ position: [5, 10, 5] }}
      >
        <Suspense fallback={null}>
          <Scene />
          <ambientLight intensity={0.1} />
          <spotLight
            castShadow={true}
            position={[-1, 3.5, 1]}
            intensity={0.4}
          />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </Layout>
  )
}
