export default function Roof() {
  return (
    <mesh rotation={[0, Math.PI * 0.25, 0]} position={[0, 2.5 + 0.5, 0]}>
      <coneGeometry args={[3.5, 1, 4]} />
      <meshStandardMaterial color={"#b35f45"} />
    </mesh>
  )
}
