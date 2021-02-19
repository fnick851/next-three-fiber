import Head from "next/head";
import dynamic from "next/dynamic";
import { Canvas } from "react-three-fiber";
import Layout from "../components/Layout";
import { useRef } from "react";
import useFullScreen from "../hooks/useFullScreen";

declare global {
  interface Document {
    webkitFullscreenElement: any;
    webkitExitFullscreen: any;
  }
}

const Control = dynamic(() => import("../components/OrbitControls"), {
  ssr: false,
});

export default function FullScreen() {
  const canvas = useRef(null);
  useFullScreen(canvas);

  return (
    <Layout>
      <Head>
        <title>Transform</title>
      </Head>

      <div className="h-screen" ref={canvas}>
        <Canvas className="bg-black">
          <mesh>
            <boxGeometry args={[1, 1, 1, 5, 5, 5]} />
            <meshBasicMaterial color={0xff0000} />
          </mesh>
          <Control />
        </Canvas>
      </div>
    </Layout>
  );
}
