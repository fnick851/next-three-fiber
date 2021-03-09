import { useLoader, useThree } from "react-three-fiber"
import { Effects } from "@react-three/drei"
import { TextureLoader, Vector2, Vector3 } from "three"
import { useEffect, useMemo, useRef } from "react"
import { useControls } from "leva"
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass"
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass"
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader"
import { tintVertexShader } from "./tint-vertex.glsl"
import { tintFragmentShader } from "./tint-fragment.glsl"
import { displacementVertexShader } from "./displacement-vertex.glsl"
import { displacementFragmentShader } from "./displacement-fragment.glsl"

export function PostEffects() {
  const {
    enable_dotScreenPass,
    enable_glitchPass,
    glitch_goes_wild,
    enable_rgbShiftPass,
    enable_unrealBloomPass,
    unrealBloom_strength,
    unrealBloom_radius,
    unrealBloom_threshold,
    red_tint,
    green_tint,
    blue_tint,
  } = useControls({
    enable_dotScreenPass: false,
    enable_glitchPass: false,
    glitch_goes_wild: {
      value: false,
      render: (get) => get("enable_glitchPass"),
    },
    enable_rgbShiftPass: false,
    enable_unrealBloomPass: false,
    unrealBloom_strength: {
      value: 0.3,
      min: 0,
      max: 2,
      step: 0.01,
      render: (get) => get("enable_unrealBloomPass"),
    },
    unrealBloom_radius: {
      value: 1,
      min: 0,
      max: 2,
      step: 0.01,
      render: (get) => get("enable_unrealBloomPass"),
    },
    unrealBloom_threshold: {
      value: 0.6,
      min: 0,
      max: 1,
      step: 0.001,
      render: (get) => get("enable_unrealBloomPass"),
    },
    red_tint: {
      value: 0,
      min: -1,
      max: 1,
      step: 0.01,
    },
    green_tint: {
      value: 0,
      min: -1,
      max: 1,
      step: 0.01,
    },
    blue_tint: {
      value: 0,
      min: -1,
      max: 1,
      step: 0.01,
    },
  })

  const { size } = useThree()

  const effectRef = useRef(null)

  // Glitch pass
  const glitchPass = useMemo(() => {
    const glitchPass = new GlitchPass()
    glitchPass.goWild = glitch_goes_wild
    glitchPass.enabled = enable_glitchPass
    return glitchPass
  }, [enable_glitchPass, glitch_goes_wild])
  useEffect(() => {
    if (effectRef.current) {
      effectRef.current.addPass(glitchPass)
    }
    return () => {
      effectRef.current.removePass(glitchPass)
    }
  }, [glitchPass])

  // Dot screen pass
  const dotScreenPass = useMemo(() => {
    const dotScreenPass = new DotScreenPass()
    dotScreenPass.enabled = enable_dotScreenPass
    return dotScreenPass
  }, [enable_dotScreenPass])
  useEffect(() => {
    if (effectRef.current) {
      effectRef.current.addPass(dotScreenPass)
    }
    return () => {
      effectRef.current.removePass(dotScreenPass)
    }
  }, [dotScreenPass])

  // RGB Shift pass
  const rgbShiftPass = useMemo(() => {
    const rgbShiftPass = new ShaderPass(RGBShiftShader)
    rgbShiftPass.enabled = enable_rgbShiftPass
    return rgbShiftPass
  }, [enable_rgbShiftPass])
  useEffect(() => {
    if (effectRef.current) {
      effectRef.current.addPass(rgbShiftPass)
    }
    return () => {
      effectRef.current.removePass(rgbShiftPass)
    }
  }, [rgbShiftPass])

  // Unreal Bloom pass
  const unrealBloomPass = useMemo(() => {
    const unrealBloomPass = new UnrealBloomPass(
      new Vector2(512, 512),
      unrealBloom_strength,
      unrealBloom_radius,
      unrealBloom_threshold
    )
    unrealBloomPass.enabled = enable_unrealBloomPass
    return unrealBloomPass
  }, [
    enable_unrealBloomPass,
    unrealBloom_strength,
    unrealBloom_radius,
    unrealBloom_threshold,
  ])
  useEffect(() => {
    if (effectRef.current) {
      effectRef.current.addPass(unrealBloomPass)
    }
    return () => {
      effectRef.current.removePass(unrealBloomPass)
    }
  }, [unrealBloomPass])

  // Tint pass
  const tintPass = useMemo(() => {
    const TintShader = {
      uniforms: {
        tDiffuse: { value: null },
        uTint: { value: null },
      },
      vertexShader: tintVertexShader,
      fragmentShader: tintFragmentShader,
    }
    const tintPass = new ShaderPass(TintShader)
    tintPass.material.uniforms.uTint.value = new Vector3(
      red_tint,
      green_tint,
      blue_tint
    )
    return tintPass
  }, [red_tint, green_tint, blue_tint])
  useEffect(() => {
    if (effectRef.current) {
      effectRef.current.addPass(tintPass)
    }
    return () => {
      effectRef.current.removePass(tintPass)
    }
  }, [tintPass])

  // Displacement pass
  const DisplacementShader = {
    uniforms: {
      tDiffuse: { value: null },
      uNormalMap: { value: null },
    },
    vertexShader: displacementVertexShader,
    fragmentShader: displacementFragmentShader,
  }
  const displacementPass = new ShaderPass(DisplacementShader)
  displacementPass.material.uniforms.uNormalMap.value = useLoader(
    TextureLoader,
    "/textures/interfaceNormalMap.png"
  )
  useEffect(() => {
    if (effectRef.current) {
      effectRef.current.addPass(displacementPass)
    }
  }, [])

  // Antialias pass
  const smaaPass = new SMAAPass(size.width, size.height)
  useEffect(() => {
    if (effectRef.current) {
      effectRef.current.addPass(smaaPass)
    }
  }, [])

  return <Effects ref={effectRef} />
}
