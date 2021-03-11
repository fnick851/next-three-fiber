import Head from "next/head"
import { Canvas, useLoader } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls, Loader } from "@react-three/drei"
import { Suspense, useEffect, useRef } from "react"
import { DoubleSide, ShaderMaterial, TextureLoader } from "three"
import { Stats } from "@react-three/drei"
import { useControls, Leva } from "leva"

function Scene() {
  const {
    turn_on_shader_object,
    turn_on_standard_objects,
    turn_on_spotlight,
  } = useControls({
    turn_on_shader_object: true,
    turn_on_standard_objects: true,
    turn_on_spotlight: true,
  })
  const displacementTexture = useLoader(
    TextureLoader,
    "/textures/displacementMap.png"
  )

  const shaderMaterial = new ShaderMaterial({
    precision: "lowp",
    uniforms: {
      uDisplacementTexture: { value: displacementTexture },
    },
    defines: {
      DISPLACMENT_STRENGH: 1.5,
    },
    vertexShader: /* glsl */ `
      uniform sampler2D uDisplacementTexture;

      varying vec3 vColor;

      void main()
      {
          // Position
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          float elevation = texture2D(uDisplacementTexture, uv).r;
          modelPosition.y += max(elevation, 0.5) * DISPLACMENT_STRENGH;
          gl_Position = projectionMatrix * viewMatrix * modelPosition;

          // Color
          float colorElevation = max(elevation, 0.25);
          vec3 color = mix(vec3(1.0, 0.1, 0.1), vec3(0.1, 0.0, 0.5), colorElevation);

          // Varying
          vColor = color;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;

      void main()
      {
          gl_FragColor = vec4(vColor, 1.0);
      }
    `,
  })

  const node = useRef(document.createElement("div"))
  useEffect(() => {
    node.current.classList.add("stats", "fixed", "bottom-1", "right-1", "flex")
    document.body.appendChild(node.current)

    return () => {
      document.body.removeChild(node.current)
    }
  }, [])

  return (
    <>
      <Stats showPanel={0} parent={node} />
      <Stats showPanel={1} parent={node} />
      <Stats showPanel={2} parent={node} />
      {turn_on_standard_objects ? (
        <>
          <mesh castShadow receiveShadow position={[-5, 0, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial />
          </mesh>
          <mesh castShadow receiveShadow>
            <torusKnotGeometry args={[1, 0.4, 128, 32]} />
            <meshStandardMaterial />
          </mesh>
          <mesh castShadow receiveShadow position={[5, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            position={[0, -2, 0]}
            rotation={[-Math.PI * 0.5, 0, 0]}
          >
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial side={DoubleSide} />
          </mesh>
        </>
      ) : null}
      {turn_on_shader_object ? (
        <mesh
          rotation={[-Math.PI * 0.5, 0, 0]}
          position={[0, 1.5, 0]}
          material={shaderMaterial}
        >
          <planeGeometry args={[10, 10, 256, 256]} />
        </mesh>
      ) : null}
      {turn_on_spotlight ? (
        <spotLight position={[0, 1, 0]} color="hotpink" />
      ) : null}
    </>
  )
}

export default function Performance() {
  return (
    <Layout>
      <Head>
        <title>Performance</title>
      </Head>

      <Leva oneLineLabels={true} />
      <Canvas className="bg-black" camera={{ position: [2, 2, 6] }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <ambientLight intensity={0.1} />
        <OrbitControls />
      </Canvas>
      <Loader />
    </Layout>
  )
}
