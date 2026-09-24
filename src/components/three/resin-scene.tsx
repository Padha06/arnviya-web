'use client';

import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { Group } from 'three';

/**
 * A soft studio gradient, baked into a PMREM environment map.
 *
 * Built procedurally on a 2D canvas rather than with drei's <Lightformer>s:
 * those are real meshes, and when the environment portal misbehaves (software
 * renderers, some GPU drivers) they leak into the main scene as stray planes.
 * A texture has no geometry, so it can never show up in the render.
 */
function GradientEnvironment() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);

  const canvasTexture = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 32;
    c.height = 256;
    const ctx = c.getContext('2d');
    if (ctx) {
      const g = ctx.createLinearGradient(0, 0, 0, 256);
      g.addColorStop(0.0, '#ffffff'); // overhead key light
      g.addColorStop(0.35, '#f0e2c4'); // warm gold bounce
      g.addColorStop(0.52, '#6f8f74'); // botanical mid tone
      g.addColorStop(0.75, '#1d4034');
      g.addColorStop(1.0, '#08120c'); // dark floor
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 32, 256);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const envMap = pmrem.fromEquirectangular(canvasTexture).texture;
    scene.environment = envMap;
    return () => {
      scene.environment = null;
      envMap.dispose();
      pmrem.dispose();
      canvasTexture.dispose();
    };
  }, [gl, scene, canvasTexture]);

  return null;
}

/** A hexagonal resin block with botanicals and gold foil suspended inside. */
function ResinBlock() {
  const group = useRef<Group>(null);

  const botanicals = useMemo(
    () => [
      { pos: [-0.34, 0.26, 0.02], color: '#7f9c6a', scale: 0.19 },
      { pos: [0.3, -0.2, -0.04], color: '#c48f8a', scale: 0.16 },
      { pos: [0.05, 0.36, 0.06], color: '#b9c9a8', scale: 0.12 },
      { pos: [-0.16, -0.34, 0.04], color: '#a8b892', scale: 0.14 },
      { pos: [0.4, 0.24, 0.02], color: '#8fae7a', scale: 0.1 },
    ],
    [],
  );

  const flakes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const r = 0.28 + ((i * 37) % 50) / 100;
        return [Math.cos(a) * r, Math.sin(a) * r * 0.9, ((i * 13) % 20) / 100 - 0.1];
      }),
    [],
  );

  return (
    <group ref={group}>
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
        {/* resin body — translucent gloss rather than `transmission`, so it
            renders identically on real GPUs and software rasterisers alike */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.98, 0.98, 0.42, 6]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.34}
            depthWrite={false}
            roughness={0.05}
            metalness={0}
            ior={1.45}
            clearcoat={1}
            clearcoatRoughness={0.04}
            color="#e2f0e4"
            envMapIntensity={1.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* botanicals preserved inside */}
        {botanicals.map((b, i) => (
          <mesh key={i} position={b.pos as [number, number, number]} scale={b.scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={b.color} roughness={0.62} metalness={0.02} />
          </mesh>
        ))}

        {/* gold foil flakes */}
        {flakes.map((f, i) => (
          <mesh key={i} position={f as [number, number, number]} scale={0.026}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#d9bc80" roughness={0.25} metalness={1} />
          </mesh>
        ))}

        {/* gold bezel ring on the front face */}
        <mesh position={[0, 0, 0.216]}>
          <torusGeometry args={[0.62, 0.012, 12, 96]} />
          <meshStandardMaterial color="#c6a15b" roughness={0.22} metalness={1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function ResinScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.85, 4.7], fov: 33 }}
      style={{ touchAction: 'pan-y' }}
    >
      <Suspense fallback={null}>
        <GradientEnvironment />

        <ambientLight intensity={0.55} />
        <spotLight
          position={[4, 6, 5]}
          angle={0.45}
          penumbra={1}
          intensity={2.4}
          color="#fdfbf6"
        />
        <pointLight position={[-4, -2, -3]} intensity={1.0} color="#3b7459" />
        <pointLight position={[0, 3, 4]} intensity={0.8} color="#e7d2a6" />

        <ResinBlock />

        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.55}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 1.75}
        />
      </Suspense>
    </Canvas>
  );
}
