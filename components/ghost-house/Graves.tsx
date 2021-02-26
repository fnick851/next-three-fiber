import { BoxGeometry, MeshStandardMaterial } from "three"

export default function Graves() {
  const graveGeometry = new BoxGeometry(0.6, 0.8, 0.1)
  const graveMaterial = new MeshStandardMaterial({ color: "#727272" })

  const graveList: JSX.Element[] = []
  for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius

    graveList.push(
      <mesh
        key={i}
        geometry={graveGeometry}
        material={graveMaterial}
        castShadow={true}
        position={[x, 0.3, z]}
        rotation={[0, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4]}
      ></mesh>
    )
  }

  return <group>{graveList}</group>
}
