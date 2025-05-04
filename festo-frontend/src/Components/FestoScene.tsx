"use client"

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import { createXRStore, XR } from '@react-three/xr';
import Model from './Machine/Cnc';
import { useRef } from 'react';

import * as THREE from 'three';
import { useControls } from 'leva';

import { Fullscreen } from "@react-three/uikit";
import { Button } from "@react-three/uikit-apfel";
import { BoxSelect } from '@react-three/uikit-lucide'
import { Card } from "@react-three/uikit-apfel"
import { Root, Container, Text } from "@react-three/uikit";
import { Defaults } from "@react-three/uikit-apfel";

const store = createXRStore({});

export function FestoScene() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <button className='p-4' onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas>
        <XR store={store}>
          {/* Ambient and directional lighting */}
          <Environment preset="sunset">
            <ambientLight intensity={0.5} />
          </Environment>

          <Grid position={[0, -0.3, 0]} args={[10, 10]} cellSize={1} cellColor="black" sectionColor="gray" />
          
          <Model />
          <CNCmachine />
          <group position={[-1, 1, -1.8]} rotation={[0, Math.PI/2, 0]} scale={[0.3, 0.3, 0.3]}>
          <Root backgroundColor="gray" sizeX={0.5} sizeY={0.25} flexDirection="row-reverse" justifyContent="center" alignItems="center" gap={16}>
            <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <ButtonsOnCard />
            </group>
          </Root>
          </group>
          {/* Add a plane to the scene */}         
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls />
        </XR>
      </Canvas>
    </div>
  );
}

function CNCmachine() {
  // Bring in all your controls including name, aNumber, sensors and the movement variables.
  const {
    name,
    aNumber,
    isLocked,
    sensor1, sensor2, sensor3, sensor4, sensor5, sensor6, sensor7, sensor8,
    sensor9, sensor10, sensor11, sensor12, sensor13, sensor14, sensor15, sensor16,
    forwardright,
    backwardright,
    forwardleft,
    backwardleft,
  } = useControls({
    name: 'World',
    aNumber: 0,
    isLocked: false,
    forwardright: false,
    backwardright: false,
    forwardleft: false,
    backwardleft: false,
    sensor1: false, sensor2: false, sensor3: false, sensor4: false,
    sensor5: false, sensor6: false, sensor7: false, sensor8: false,
    sensor9: false, sensor10: false, sensor11: false, sensor12: false,
    sensor13: false, sensor14: false, sensor15: false, sensor16: false
  });

  return (
    <group>
      <Model />
      <InteracitveCylinder isLocked={isLocked} position={[-1.65, 0.581, -0.35]} rotation={[0, 0, 0]} />
      <InteracitveCylinder isLocked={isLocked} position={[-1.645, 0.581, -0.83]} rotation={[0, 0, 0]} />
      <InteracitveCylinder isLocked={isLocked} position={[-1.285, 0.581, -0.81]} rotation={[0, 0, 0]} />
      <InteracitveCylinder isLocked={isLocked} position={[-1.285, 0.581, -1.29]} rotation={[0, 0, 0]} />

      <InteractiveBubble isLocked={sensor1} position={[-1.144, 0.66, -1.215]} rotation={[0, 0, 0]} />
      <InteractiveBubble isLocked={sensor2} position={[-1.144, 0.66, -1.285]} rotation={[0, 0, 0]} />
      <InteractiveBubble isLocked={sensor3} position={[-1.144, 0.66, -0.805]} rotation={[0, 0, 0]} />
      <InteractiveBubble isLocked={sensor4} position={[-1.144, 0.66, -0.738]} rotation={[0, 0, 0]} />
      <InteractiveBubble isLocked={sensor5} position={[-1.424, 0.66, -1.285]} rotation={[0, 0, 0]} />
      <InteractiveBubble isLocked={sensor6} position={[-1.424, 0.66, -0.805]} rotation={[0, 0, 0]} />
      <InteractiveBubble isLocked={sensor7} position={[-1.424, 0.66, -0.891]} rotation={[0, 0, 0]} />
      <InteractiveBubble isLocked={sensor8} position={[-1.424, 0.66, -0.415]} rotation={[0, 0, 0]} />
      <InteractiveBubble isLocked={sensor9} position={[-1.505, 0.66, -0.358]} rotation={[0, 0, 0]} />
      <InteractiveBubble isLocked={sensor10} position={[-1.505, 0.66, -0.835]} rotation={[0, 0, 0]} />
      <InteractiveBubble isLocked={sensor11} position={[-1.505, 0.66, -0.75]} rotation={[0, 0, 0]} />
      <InteractiveBubble isLocked={sensor12} position={[-1.505, 0.66, -1.228]} rotation={[0, 0, 0]} />
      <InteractiveBubble isLocked={sensor13} position={[-1.785, 0.66, -0.835]} rotation={[0, 0, 0]} />
      <InteractiveBubble isLocked={sensor14} position={[-1.785, 0.66, -0.905]} rotation={[0, 0, 0]} />
      <InteractiveBubble isLocked={sensor15} position={[-1.785, 0.66, -0.425]} rotation={[0, 0, 0]} />
      <InteractiveBubble isLocked={sensor16} position={[-1.785, 0.66, -0.355]} rotation={[0, 0, 0]} />

      {/* Only show the ConveyerRow if the specific movement state is active */}
      {forwardright && !backwardright && (
        <>
          <ConveyerRow isLocked={forwardright} position={[-1.223, 0.645, -0.3]} rotation={[0, Math.PI, 0]} />
          <ConveyerRow isLocked={forwardright} position={[-1.425, 0.645, -0.3]} rotation={[0, Math.PI, 0]} />
        </>
      )}

      {backwardright && !forwardright && (
        <>
          <ConveyerRow isLocked={backwardright} position={[-1.145, 0.645, -1.3]} rotation={[0, 0, 0]} />
          <ConveyerRow isLocked={backwardright} position={[-1.345, 0.645, -1.3]} rotation={[0, 0, 0]} />
        </>
      )}

      {forwardleft && !backwardleft && (
        <>
          <ConveyerRow isLocked={forwardleft} position={[-1.583, 0.645, -0.3]} rotation={[0, Math.PI, 0]} />
          <ConveyerRow isLocked={forwardleft} position={[-1.784, 0.645, -0.3]} rotation={[0, Math.PI, 0]} />
        </>
      )}

      {backwardleft && !forwardleft && (
        <>
          <ConveyerRow isLocked={backwardleft} position={[-1.7, 0.645, -1.3]} rotation={[0, 0, 0]} />
          <ConveyerRow isLocked={backwardleft} position={[-1.5, 0.645, -1.3]} rotation={[0, 0, 0]} />
        </>
      )}
    </group>
  );
}

function InteracitveCylinder({ isLocked, position, rotation }: { isLocked: boolean, position: [number, number, number], rotation: [number, number, number] }) {
  const innerCylinderRef = useRef<THREE.Mesh>(null!);

  useFrame((state, dt) => {
    if (innerCylinderRef.current) {
      if (isLocked) {
        // Move down when isLocked is true
        innerCylinderRef.current.position.y = Math.max(0.001, innerCylinderRef.current.position.y - dt * 0.15);
      } else {
        // Move up when isLocked is false
        innerCylinderRef.current.position.y = Math.min(0.03, innerCylinderRef.current.position.y + dt * 0.15);
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0]} ref={innerCylinderRef}>
        <cylinderGeometry args={[0.010, 0.010, 0.11, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.05, 0.11, 0.05]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </group>
  );
}

function InteractiveBubble({ isLocked, position, rotation }: { isLocked: boolean, position: [number, number, number], rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {isLocked && (
        <mesh>
          <sphereGeometry args={[0.015, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      )}
    </group>
  );
}

// The Conveyer component now only shows the green arrows when isLocked is true.
// No blue (regular) bars are rendered.
function Conveyer({ isLocked, position, rotation }: { isLocked: boolean; position: [number, number, number]; rotation: [number, number, number]; }) {
  if (!isLocked) return null; // Do not render if not moving.
  
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0.045, 0, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[0.02, 0.005, 0.005]} />
        <meshStandardMaterial color="green" />
      </mesh>
      <mesh position={[0.035, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.02, 0.005, 0.005]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </group>
  );
}

// The ConveyerRow remains mostly the same. It loops through several Conveyer components in a group.
function ConveyerRow({ isLocked, position, rotation }: { isLocked: boolean; position: [number, number, number]; rotation: [number, number, number]; }) {
  const rowRef = useRef<THREE.Group>(null);
  const initialZ = position[2]; // original Z position
  const maxDistance = 0.05;        // amount to move before resetting
  const speed = 0.02;

  useFrame((state, dt) => {
    if (rowRef.current && isLocked) {
      const direction = rotation[1] === Math.PI ? -1 : 1;
      rowRef.current.position.z += speed * direction * dt;
      if (Math.abs(rowRef.current.position.z - initialZ) >= maxDistance) {
        rowRef.current.position.z = initialZ;
      }
    }
  });

  return (
    <group position={position} rotation={rotation} ref={rowRef}>
      {[...Array(6)].map((_, i) => (
        <Conveyer key={i} isLocked={isLocked} position={[0, 0, i * 0.2]} rotation={[0, Math.PI, 0]} />
      ))}
    </group>
  );
}


function ButtonsOnCard() {
  return (
    <Container flexDirection="column" md={{ flexDirection: 'row' }} alignItems="center" gap={32}>
      <Card borderRadius={32} padding={8}>
        <Container flexDirection="column" justifyContent="space-between" alignItems="center" gapRow={16}>

          <Button variant="rect" size="sm" platter>
            <Text>Right/forward</Text>
          </Button>

          <Button variant="rect" size="sm" platter>
            <Text>Right/backward</Text>
          </Button>

          <Button variant="rect" size="sm" platter>
            <Text>Left/forward</Text>
          </Button>

          <Button variant="rect" size="sm" platter>
            <Text>Left/backward</Text>
          </Button>

        </Container>
      </Card>
    </Container>
  )
  }