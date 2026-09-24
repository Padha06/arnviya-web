'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

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
    // Studio-light backdrop: the poster photo the scene crossfades from sits on
    // a light sweep, and the GLB's resin is alpha-blended — against the dark
    // section it would read muddy. This keeps the card continuous.
    scene.background = new THREE.Color('#e7e4dc');
    return () => {
      scene.environment = null;
      scene.background = null;
      envMap.dispose();
      pmrem.dispose();
      canvasTexture.dispose();
    };
  }, [gl, scene, canvasTexture]);

  return null;
}

/**
 * The authored resin clock (Clock_resin.glb): normalized to the stage the
 * old procedural block occupied, and played on its baked 4s rocking loop.
 */
function ClockModel({ onReady }: { onReady?: () => void }) {
  const { scene, animations } = useGLTF('/models/clock-resin.glb');
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const ready = useRef(false);
  const reduce = usePrefersReducedMotion();

  // The Blender export is ~0.32 units across — center it and scale it up to
  // the ~2-unit stage the camera and framing were composed around.
  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.0 / maxDim;
    return {
      position: [
        -center.x * scale,
        -center.y * scale,
        -center.z * scale,
      ] as [number, number, number],
      scale,
    };
  }, [scene]);

  useEffect(() => {
    if (animations.length) {
      const m = new THREE.AnimationMixer(scene);
      for (const clip of animations) {
        const action = m.clipAction(clip);
        if (reduce) {
          /* Rest on the first frame; drag-to-rotate still works. */
          action.setLoop(THREE.LoopOnce, 1);
          action.clampWhenFinished = true;
          action.play();
          action.paused = true;
          action.time = 0;
        } else {
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.play();
        }
      }
      mixer.current = m;
    }
    if (!ready.current) {
      ready.current = true;
      onReady?.();
    }
    return () => {
      mixer.current?.stopAllAction();
      mixer.current?.uncacheRoot(scene);
      mixer.current = null;
    };
  }, [scene, animations, onReady, reduce]);

  useFrame((_, delta) => {
    // clamp so a backgrounded tab doesn't jump the loop on return
    mixer.current?.update(Math.min(delta, 0.1));
  });

  return (
    <group position={fit.position} scale={fit.scale}>
      <primitive object={scene} />
    </group>
  );
}

export default function ResinScene({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.85, 4.7], fov: 33 }}
      style={{ touchAction: 'pan-y' }}
    >
      <Suspense fallback={null}>
        <GradientEnvironment />

        <ambientLight intensity={0.75} />
        <spotLight
          position={[4, 6, 5]}
          angle={0.45}
          penumbra={1}
          intensity={3.0}
          color="#fdfbf6"
        />
        <pointLight position={[-4, -2, -3]} intensity={1.2} color="#3b7459" />
        <pointLight position={[0, 3, 4]} intensity={1.0} color="#e7d2a6" />

        <ClockModel onReady={onReady} />

        {/* Drag only — the baked turntable is the idle motion. Stacking
            autoRotate on top of it spun the camera and the model against
            each other. */}
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 1.75}
        />
      </Suspense>
    </Canvas>
  );
}
