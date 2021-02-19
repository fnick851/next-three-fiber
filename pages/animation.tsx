import Head from "next/head"
import { Canvas, useUpdate } from "react-three-fiber"
import Layout from "../components/Layout"
import gsap from "gsap"
import { Object3D } from "three"

const Box = () => {
  const mesh = useUpdate((mesh: Object3D) => {
    gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
  }, [])

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={0xff0000} />
    </mesh>
  )
}

export default function Animation() {
  return (
    <Layout>
      <Head>
        <title>Animation</title>
      </Head>

      <Canvas className="bg-black">
        <Box />
      </Canvas>
    </Layout>
  )
}
