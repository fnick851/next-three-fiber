import dynamic from "next/dynamic"
import Head from "next/head"
import Layout from "../components/Layout"

const MaterialsScene = dynamic(() => import("../components/MaterialsScene"), {
  ssr: false,
})

export default function Materials() {
  return (
    <Layout>
      <Head>
        <title>Materials</title>
      </Head>

      <MaterialsScene />
    </Layout>
  )
}
