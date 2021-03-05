import Head from "next/head"
import { Canvas, useFrame, useLoader, useResource } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls } from "@react-three/drei"
import {
  BufferAttribute,
  Color,
  DoubleSide,
  PlaneGeometry,
  ShaderMaterial,
  TextureLoader,
  Vector2,
} from "three"
import { Suspense } from "react"
import { LoadingScene } from "../components/LoadingScene"

const vertexShader = /*glsl*/ `
  uniform vec2 uFrequency;
  uniform float uTime;

  varying vec2 vUv;
  varying float vElevation;

  void main()
  {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);

      float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
      elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

      modelPosition.z += elevation;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;

      vUv = uv;
      vElevation = elevation;
  }
`

const fragmentShader = /*glsl*/ `
  uniform vec3 uColor;
  uniform sampler2D uTexture;

  varying vec2 vUv;
  varying float vElevation;

  void main()
  {
      vec4 textureColor = texture2D(uTexture, vUv);
      textureColor.rgb *= vElevation * 2.0 + 0.65;
      gl_FragColor = textureColor;
  }
`

function Scene() {
  const flagTexture = useLoader(TextureLoader, "/textures/flag-mgs.jpg")

  const geometry = new PlaneGeometry(1.92, 1.08, 100, 100)
  const count = geometry.attributes.position.count
  const randoms = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    randoms[i] = Math.random()
  }
  geometry.setAttribute("aRandom", new BufferAttribute(randoms, 1))

  const uniforms = {
    uFrequency: { value: new Vector2(5, 5) },
    uTime: { value: 0 },
    uColor: { value: new Color("orange") },
    uTexture: { value: flagTexture },
  }

  const shaderMaterialRef = useResource()
  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime()
    const material = shaderMaterialRef.current as ShaderMaterial
    if (material) {
      material.uniforms.uTime.value = elapsedTime
    }
  })

  return (
    <mesh geometry={geometry}>
      <shaderMaterial
        side={DoubleSide}
        ref={shaderMaterialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

export default function ShaderFlag() {
  return (
    <Layout>
      <Head>
        <title>Shader Flag</title>
      </Head>

      <Canvas className="bg-black">
        <Suspense fallback={<LoadingScene />}>
          <Scene />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </Layout>
  )
}