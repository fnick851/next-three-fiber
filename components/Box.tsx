import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import type { Mesh } from "three";

export default function Box(props) {
  const mesh = useRef<Mesh>();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (hovered) {
      body.style.cursor = "pointer";
    } else {
      body.style.cursor = "default";
    }
  });

  useFrame(() => {
    if (mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "steelblue" : "lightgreen"} />
    </mesh>
  );
}
