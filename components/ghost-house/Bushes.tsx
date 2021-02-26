import { MeshStandardMaterial, SphereGeometry, Vector3 } from "three"

export function Bushes() {
  const bushGeometry = new SphereGeometry(1, 16, 16)
  const bushMaterial = new MeshStandardMaterial({ color: "#89c854" })

  const bushConfigs = [
    {
      scale: [0.5, 0.5, 0.5],
      position: [0.8, 0.2, 2.2],
    },
    {
      scale: [0.25, 0.25, 0.25],
      position: [1.4, 0.1, 2.1],
    },
    {
      scale: [0.4, 0.4, 0.4],
      position: [-0.8, 0.1, 2.2],
    },
    {
      scale: [0.15, 0.15, 0.15],
      position: [-1, 0.05, 2.6],
    },
  ]

  return (
    <>
      {bushConfigs.map(({ scale, position }, index) => (
        <mesh
          key={index}
          geometry={bushGeometry}
          material={bushMaterial}
          castShadow={true}
          scale={new Vector3(...scale)}
          position={new Vector3(...position)}
        ></mesh>
      ))}
    </>
  )
}
