import Head from "next/head"
import { Canvas, useFrame, useThree } from "react-three-fiber"
import { Layout } from "../components/Layout"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { MutableRefObject, Suspense, useEffect, useRef } from "react"
import {
  CubeTextureLoader,
  Raycaster,
  ReinhardToneMapping,
  sRGBEncoding,
  Vector3,
} from "three"

function Scene(props: { labels: MutableRefObject<any>[] }) {
  const { scene, gl: renderer, camera, size } = useThree()
  renderer.physicallyCorrectLights = true
  renderer.outputEncoding = sRGBEncoding
  renderer.toneMappingExposure = 3
  renderer.toneMapping = ReinhardToneMapping

  const cubeTextureLoader = new CubeTextureLoader()
  const environmentMap = cubeTextureLoader.load([
    "/textures/environmentMaps/sky/nx.jpg",
    "/textures/environmentMaps/sky/ny.jpg",
    "/textures/environmentMaps/sky/nz.jpg",
    "/textures/environmentMaps/sky/px.jpg",
    "/textures/environmentMaps/sky/py.jpg",
    "/textures/environmentMaps/sky/pz.jpg",
  ])
  environmentMap.encoding = sRGBEncoding
  scene.background = environmentMap
  scene.environment = environmentMap

  const { scene: helmetModel } = useGLTF(
    "/models/DamagedHelmet/glTF/DamagedHelmet.gltf"
  )
  helmetModel.scale.set(2.5, 2.5, 2.5)
  helmetModel.rotation.y = Math.PI * 0.5
  scene.add(helmetModel)

  const directionalLightRef = useRef(null)
  useEffect(() => {
    const directionalLight = directionalLightRef.current
    if (directionalLight) {
      directionalLight.shadow.camera.far = 15
      directionalLight.shadow.mapSize.set(1024, 1024)
      directionalLight.shadow.normalBias = 0.05
    }
  })

  const raycaster = new Raycaster()
  let points = []
  const { labels } = props
  const [label1, label2, label3] = labels
  if (label1.current && label1.current && label1.current) {
    points = [
      {
        position: new Vector3(1.55, 0.3, -0.6),
        element: label1.current,
      },
      {
        position: new Vector3(0.5, 0.8, -1.6),
        element: label2.current,
      },
      {
        position: new Vector3(1.6, -1.3, -0.7),
        element: label3.current,
      },
    ]
  }

  useFrame(() => {
    for (const point of points) {
      const screenPosition = point.position.clone()
      screenPosition.project(camera)

      raycaster.setFromCamera(screenPosition, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length === 0) {
        point.element.firstChild.classList.add("scale-100")
      } else {
        const intersectionDistance = intersects[0].distance
        const pointDistance = point.position.distanceTo(camera.position)

        if (intersectionDistance < pointDistance) {
          point.element.firstChild.classList.remove("scale-100")
        } else {
          point.element.firstChild.classList.add("scale-100")
        }
      }

      const translateX = screenPosition.x * size.width * 0.5
      const translateY = -screenPosition.y * size.height * 0.5
      point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
    }
  })

  return (
    <>
      <directionalLight
        castShadow
        position={[0.25, 3, -2.25]}
        ref={directionalLightRef}
      />
      <OrbitControls />
    </>
  )
}

export default function Labels() {
  const labelsConfig = [
    {
      ref: useRef(null),
      text: "Front and top screen with HUD aggregating terrain and battle informations.",
    },
    {
      ref: useRef(null),
      text: "Ventilation with air purifier and detection of environment toxicity.",
    },
    {
      ref: useRef(null),
      text: "Cameras supporting night vision and heat vision with automatic adjustment.",
    },
  ]

  return (
    <Layout>
      <Head>
        <title>Labels - Three.js Journey to R3F</title>
      </Head>

      <Canvas
        shadowMap={true}
        className="bg-black"
        camera={{ position: [4, 1, -4] }}
      >
        <Suspense fallback={null}>
          <Scene labels={labelsConfig.map((item) => item.ref)} />
        </Suspense>
      </Canvas>
      {labelsConfig.map(({ ref, text }, index) => (
        <div className="group absolute top-1/2 left-1/2" ref={ref} key={index}>
          <div className="absolute -top-8 -left-8 w-10 h-10 rounded-50% bg-black bg-opacity-75 border-gray-400 border-2 text-white font-sans text-center leading-9 cursor-help transform scale-0 transition-transform delay-300">
            {index}
          </div>
          <div className="group-hover:opacity-100 absolute top-10 -left-32 w-48 p-5 rounded bg-black bg-opacity-75 border-gray-400 border-2 text-white leading-5 font-sans text-sm opacity-0 transition-opacity delay-100 pointer-events-none">
            {text}
          </div>
        </div>
      ))}
    </Layout>
  )
}
