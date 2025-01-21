/* React Three Fiber を使って多面体を表示するアプリ */

import { Edges } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import JEASINGS from 'jeasings';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function Model(props: {
  position: [number, number, number];
  geometry: THREE.BufferGeometry;
  rotation: THREE.Vector3;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [active, setActive] = useState<boolean>(false);
  const [hovered, setHovered] = useState(false);
  const rotation = props.rotation.normalize();

  useFrame((_state, delta) => {
    const q = new THREE.Quaternion().setFromAxisAngle(rotation, 0.3 * delta);
    meshRef.current?.quaternion.multiply(q);
  });

  return (
    <>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: */}
      <mesh
        position={props.position}
        geometry={props.geometry}
        ref={meshRef}
        onClick={() => {
          if (!meshRef.current) return;
          new JEASINGS.JEasing(meshRef.current.scale)
            .to(
              {
                x: 0.9,
                y: 0.9,
                z: 0.9,
              },
              100,
            )
            .easing(JEASINGS.Cubic.Out)
            .start()
            .onComplete(() => {
              if (!meshRef.current) return;
              new JEASINGS.JEasing(meshRef.current.scale)
                .to(
                  {
                    x: 1,
                    y: 1,
                    z: 1,
                  },
                  200,
                )
                .easing(JEASINGS.Cubic.Out)
                .start();
            });
          setActive((c) => !c);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onWheel={(e) => {
          if (!meshRef.current) return;
          const q_from = meshRef.current.quaternion.clone();
          const q_to = new THREE.Quaternion().multiplyQuaternions(
            meshRef.current.quaternion,
            new THREE.Quaternion().setFromAxisAngle(rotation, e.deltaY * 1.05),
          );
          const q_slerp = new THREE.Quaternion();
          const ti = { t: 0 };
          new JEASINGS.JEasing(ti)
            .to({ t: 1 }, 100)
            .easing(JEASINGS.Linear.None)
            .onUpdate(() => {
              if (!meshRef.current) return;
              q_slerp.slerpQuaternions(q_from, q_to, ti.t);
              meshRef.current.quaternion.set(
                q_slerp.x,
                q_slerp.y,
                q_slerp.z,
                q_slerp.w,
              );
            })
            .start();
        }}
      >
        {active || hovered ? (
          <meshLambertMaterial color="#dfdfdf" flatShading={true} />
        ) : (
          <meshBasicMaterial color="#090a0c" />
        )}
        {active || hovered ? undefined : (
          <Edges lineWidth={1} threshold={15} color="white" />
        )}
      </mesh>
    </>
  );
}

function JEasings() {
  useFrame(() => {
    JEASINGS.update();
  });
  return <></>;
}

export const Polyhedron: React.FC = () => {
  return (
    <Canvas
      onCreated={(state) => {
        state.gl.toneMapping = THREE.NoToneMapping;
      }}
      camera={{ position: [0, 0, 10], fov: 15 }}
    >
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[20, 20, 20]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <Model
        position={[-4, 0, 0]}
        rotation={new THREE.Vector3(1, 0, 0.1)}
        geometry={new THREE.TetrahedronGeometry()}
      />
      <Model
        position={[-2, 0, 0]}
        rotation={new THREE.Vector3(1, 0, 0.2)}
        geometry={new THREE.BoxGeometry()}
      />
      <Model
        position={[0, 0, 0]}
        rotation={new THREE.Vector3(1, 0, 0.3)}
        geometry={new THREE.OctahedronGeometry()}
      />
      <Model
        position={[2, 0, 0]}
        rotation={new THREE.Vector3(1, 0, 0.4)}
        geometry={new THREE.DodecahedronGeometry()}
      />
      <Model
        position={[4, 0, 0]}
        rotation={new THREE.Vector3(1, 0, 0.5)}
        geometry={new THREE.IcosahedronGeometry()}
      />
      <JEasings />
    </Canvas>
  );
};
