import { useUpdate } from "react-three-fiber"
import { BoxGeometry, Float32BufferAttribute } from "three"

export function useUV2() {
  const geomRef = useUpdate((geometry: BoxGeometry) => {
    geometry.setAttribute(
      "uv2",
      new Float32BufferAttribute(geometry.attributes.uv.array, 2)
    )
  }, [])
  return geomRef
}
