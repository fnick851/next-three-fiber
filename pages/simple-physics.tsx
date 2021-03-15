import Head from "next/head"
import { Canvas } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls } from "@react-three/drei"
import { CubeTextureLoader } from "three"
import { Physics, usePlane, useBox, useSphere } from "@react-three/cannon"
import { useState } from "react"

let environmentMapTexture
let playHitSound
if (typeof window !== "undefined") {
  const cubeTextureLoader = new CubeTextureLoader()
  environmentMapTexture = cubeTextureLoader.load([
    "/textures/environmentMaps/simple-physics/px.png",
    "/textures/environmentMaps/simple-physics/nx.png",
    "/textures/environmentMaps/simple-physics/py.png",
    "/textures/environmentMaps/simple-physics/ny.png",
    "/textures/environmentMaps/simple-physics/pz.png",
    "/textures/environmentMaps/simple-physics/nz.png",
  ])

  const hitSound = new Audio("/sounds/hit.mp3")
  playHitSound = (collision) => {
    const impactStrength = collision.contact.impactVelocity
    if (impactStrength > 1.5) {
      hitSound.volume = Math.random()
      hitSound.currentTime = 0
      hitSound.play()
    }
  }
}

function Ball(props) {
  const [ref] = useSphere(() => ({
    mass: 1,
    position: [0, 9, 0],
    onCollide: (collision) => {
      playHitSound(collision)
    },
    ...props,
  }))

  return (
    <mesh ref={ref} receiveShadow={true} castShadow={true}>
      <sphereGeometry args={[1, 20, 20]} />
      <meshStandardMaterial
        metalness={1}
        roughness={0}
        envMap={environmentMapTexture}
      />
    </mesh>
  )
}

function Box(props) {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [0, 8, 0],
    rotation: [0.4, 0.2, 0.5],
    onCollide: (collision) => {
      playHitSound(collision)
    },
    ...props,
  }))

  return (
    <mesh ref={ref} receiveShadow={true} castShadow={true}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        metalness={1}
        roughness={0}
        envMap={environmentMapTexture}
      />
    </mesh>
  )
}

function Floor() {
  return (
    <>
      <mesh receiveShadow={true} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={"#777777"} />
      </mesh>
      <mesh position={[0, -0.01, 0]} rotation={[0.5 * Math.PI, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshPhongMaterial color={"#777777"} />
      </mesh>
    </>
  )
}

function Scene({ nBox, nBall }) {
  let boxes = []
  for (let i = 0; i < nBox; i++) boxes.push(<Box key={i} />)

  let balls = []
  for (let i = 0; i < nBall; i++) balls.push(<Ball key={i} />)

  return (
    <>
      <Physics>
        {boxes}
        {balls}
        <Floor />
      </Physics>
    </>
  )
}

export default function SimplePhysics() {
  const [nBox, setNBox] = useState(1)
  const [nBall, setNBall] = useState(0)

  return (
    <Layout>
      <Head>
        <title>Simple Physics</title>
      </Head>

      <Canvas
        className="bg-black"
        shadowMap={true}
        camera={{ position: [5, 10, 5] }}
      >
        <Scene nBall={nBall} nBox={nBox} />
        <axesHelper />
        <ambientLight args={["hotpink", 0.5]} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow={true}
        />
        <OrbitControls />
      </Canvas>
      <div className="fixed top-1.5 right-1.5">
        <button
          className="bg-white px-2 rounded text-sm mr-2"
          onClick={() => setNBox(nBox + 1)}
        >
          add a box
        </button>
        <button
          className="bg-white px-2 rounded text-sm"
          onClick={() => setNBall(nBall + 1)}
        >
          add a ball
        </button>
      </div>
    </Layout>
  )
}
