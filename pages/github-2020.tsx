import dynamic from "next/dynamic"
import Head from "next/head"
import { Canvas } from "react-three-fiber"
import Layout from "../components/Layout"

const Github2020Scene = dynamic(() => import("../components/Github2020Scene"), {
  ssr: false,
})

export default function Github2020() {
  return (
    <Layout>
      <Head>
        <title>Github 2020</title>
      </Head>

      <Canvas className="bg-black">
        <Github2020Scene />
      </Canvas>
    </Layout>
  )
}
