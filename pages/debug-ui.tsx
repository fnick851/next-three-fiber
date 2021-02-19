import dynamic from "next/dynamic"
import Head from "next/head"
import Layout from "../components/Layout"

const DebugUIScene = dynamic(() => import("../components/DebugUIScene"), {
  ssr: false,
})

export default function DebugUI() {
  return (
    <Layout>
      <Head>
        <title>Debug UI</title>
      </Head>

      <DebugUIScene />
    </Layout>
  )
}
