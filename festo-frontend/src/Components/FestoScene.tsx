"use client"

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import { createXRStore, XR } from '@react-three/xr';
import Model from './Machine/Cnc';

const store = createXRStore({
})


export function FestoScene() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <button className='p-4' onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas>
      <XR store={store}>

        {/* Add ambient light */}
        <Environment preset="sunset">
          <ambientLight intensity={0.5} />
        </Environment>

        <Grid position={[0, -0.3, 0]} args={[10, 10]} cellSize={1} cellColor="black" sectionColor="gray" />

        <Model />

        {/* Add directional light */}
        <directionalLight position={[10, 10, 5]} intensity={1} />

       

        {/* Add orbit controls to move the camera with mouse */}
        <OrbitControls />
      </XR>
      </Canvas>
    </div>
  );
}
