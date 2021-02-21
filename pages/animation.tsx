import Head from "next/head"
import { Canvas, useUpdate } from "react-three-fiber"
import Layout from "../components/Layout"
import gsap from "gsap"
import { Object3D } from "three"
import dynamic from "next/dynamic"

const Box = () => {
  const mesh = useUpdate((mesh: Object3D) => {
    gsap.to(mesh.position, { duration: 1, delay: 1.5, x: 2 })
  }, [])

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={0xff0000} />
    </mesh>
  )
}

const OrbitControls = dynamic(() => import("../components/OrbitControls"), {
  ssr: false,
})

const Texts = dynamic(() => import("../components/Texts"), { ssr: false })

export default function Animation() {
  return (
    <Layout>
      <Head>
        <title>Animation</title>
      </Head>

      <Canvas className="bg-black">
        <Box />
        <Texts position={[-0.5, 0.5, 0.5]}>
          <p>it'll move...</p>
        </Texts>
        <OrbitControls />
      </Canvas>
    </Layout>
  )
}
