import { MutableRefObject, useEffect } from "react"

export function useLightShadowConfigs(lightRef: MutableRefObject<any>) {
  useEffect(() => {
    const light = lightRef.current
    if (light) {
      light.shadow.mapSize.width = 256
      light.shadow.mapSize.height = 256
      light.shadow.camera.far = 7
    }
  })
}
