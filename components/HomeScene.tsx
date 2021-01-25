import Box from "../components/Box";

const HomeScene = () => {
  return (
    <>
      <ambientLight args={["white", 0.1]} />
      <pointLight position={[10, 10, 10]} />
      <spotLight position={[-1.5, -1.5, -1]} color="red" />
      <axesHelper args={[3]} />
      <Box position={[-1, 0, 0]} />
      <Box position={[1, 0, 0]} />
    </>
  );
};

export default HomeScene;
