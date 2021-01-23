import Box from "../components/Box";
import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { SpotLightHelper } from "three";

const HomeScene = () => {
  const spotLight = useRef();
  useHelper(spotLight, SpotLightHelper, "teal");

  return (
    <>
      <ambientLight args={["white", 0.1]} />
      <pointLight position={[10, 10, 10]} />
      <spotLight ref={spotLight} position={[-1.5, -1.5, -1]} color="red" />
      <axesHelper args={[3]} />
      <Box position={[-1, 0, 0]} />
      <Box position={[1, 0, 0]} />
    </>
  );
};

export default HomeScene;
