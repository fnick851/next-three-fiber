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
    strength,
    radius,
    threshold,
    red,
    green,
    blue,
  } = useControls({
    enable_dotScreenPass: false,
    enable_glitchPass: false,
    glitch_goes_wild: false,
    enable_rgbShiftPass: false,
    enable_unrealBloomPass: false,
    strength: {
      value: 0.3,
      min: 0,
      max: 2,
      step: 0.01,
    },
    radius: {
      value: 1,
      min: 0,
      max: 2,
      step: 0.01,
    },
    threshold: {
      value: 0.6,
      min: 0,
      max: 1,
      step: 0.001,
    },
    red: {
      value: 0,
      min: -1,
      max: 1,
      step: 0.01,
    },
    green: {
      value: 0,
      min: -1,
      max: 1,
      step: 0.01,
    },
    blue: {
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
      strength,
      radius,
      threshold
    )
    unrealBloomPass.enabled = enable_unrealBloomPass
    return unrealBloomPass
  }, [enable_unrealBloomPass, strength, radius, threshold])
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
    tintPass.material.uniforms.uTint.value = new Vector3(red, green, blue)
    return tintPass
  }, [red, green, blue])
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
