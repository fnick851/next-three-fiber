import dynamic from "next/dynamic"
import Head from "next/head"
import Layout from "../components/Layout"

const ThreeDTextScene = dynamic(() => import("../components/ThreeDTextScene"), {
  ssr: false,
})

export default function ThreeDText() {
  return (
    <Layout>
      <Head>
        <title>3D Text</title>
      </Head>

      <ThreeDTextScene />
    </Layout>
  )
}
