import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function RealisticRocket() {
  const bodyMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#f7f7f7',
        metalness: 0.55,
        roughness: 0.22,
        clearcoat: 0.35,
      }),
    []
  )
  const darkMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1f2937', metalness: 0.6, roughness: 0.45 }),
    []
  )
  const saffronMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#ff9933', metalness: 0.25, roughness: 0.35 }),
    []
  )
  const greenMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#138808', metalness: 0.25, roughness: 0.35 }),
    []
  )
  const panelMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#e2e8f0', metalness: 0.35, roughness: 0.4 }),
    []
  )

  return (
    <group>
      {/* Payload fairing */}
      <mesh position={[0, 2.5, 0]} material={bodyMat}>
        <coneGeometry args={[0.28, 0.8, 40]} />
      </mesh>
      <mesh position={[0, 2.12, 0]} material={panelMat}>
        <cylinderGeometry args={[0.275, 0.275, 0.06, 40]} />
      </mesh>
      <mesh position={[0, 2.0, 0]} material={saffronMat}>
        <cylinderGeometry args={[0.27, 0.27, 0.12, 40]} />
      </mesh>

      {/* Upper stage */}
      <mesh position={[0, 1.28, 0]} material={bodyMat}>
        <cylinderGeometry args={[0.26, 0.26, 1.35, 40]} />
      </mesh>
      <mesh position={[0, 1.05, 0]} material={panelMat}>
        <cylinderGeometry args={[0.265, 0.265, 0.08, 40]} />
      </mesh>
      <mesh position={[0, 0.75, 0]} material={greenMat}>
        <cylinderGeometry args={[0.265, 0.265, 0.12, 40]} />
      </mesh>
      <mesh position={[0, 0.55, 0]} material={panelMat}>
        <cylinderGeometry args={[0.27, 0.27, 0.06, 40]} />
      </mesh>

      {/* Interstage */}
      <mesh position={[0, 0.15, 0]} material={darkMat}>
        <cylinderGeometry args={[0.28, 0.28, 0.4, 40]} />
      </mesh>
      <mesh position={[0, 0.02, 0]} material={panelMat}>
        <cylinderGeometry args={[0.285, 0.285, 0.06, 40]} />
      </mesh>

      {/* Core stage */}
      <mesh position={[0, -0.7, 0]} material={bodyMat}>
        <cylinderGeometry args={[0.3, 0.3, 1.8, 40]} />
      </mesh>
      <mesh position={[0, -0.25, 0]} material={saffronMat}>
        <cylinderGeometry args={[0.305, 0.305, 0.14, 40]} />
      </mesh>
      <mesh position={[0, -0.95, 0]} material={greenMat}>
        <cylinderGeometry args={[0.305, 0.305, 0.14, 40]} />
      </mesh>
      <mesh position={[0, -1.2, 0]} material={panelMat}>
        <cylinderGeometry args={[0.31, 0.31, 0.06, 40]} />
      </mesh>

      {/* Strap-on boosters */}
      <mesh position={[0.52, -0.6, 0]} material={panelMat}>
        <cylinderGeometry args={[0.12, 0.12, 1.4, 28]} />
      </mesh>
      <mesh position={[-0.52, -0.6, 0]} material={panelMat}>
        <cylinderGeometry args={[0.12, 0.12, 1.4, 28]} />
      </mesh>

      {/* Engine mount */}
      <mesh position={[0, -1.5, 0]} material={darkMat}>
        <cylinderGeometry args={[0.34, 0.36, 0.25, 40]} />
      </mesh>
      <mesh position={[0, -1.32, 0]} material={panelMat}>
        <cylinderGeometry args={[0.33, 0.33, 0.06, 40]} />
      </mesh>

      {/* Engine bells */}
      <mesh position={[-0.12, -1.75, 0]} material={darkMat}>
        <coneGeometry args={[0.1, 0.35, 24]} />
      </mesh>
      <mesh position={[0.12, -1.75, 0]} material={darkMat}>
        <coneGeometry args={[0.1, 0.35, 24]} />
      </mesh>
      <mesh position={[0, -1.75, 0.12]} material={darkMat}>
        <coneGeometry args={[0.1, 0.35, 24]} />
      </mesh>

      {/* Grid fins */}
      <mesh position={[0.36, -1.1, 0]} rotation={[0, 0, -0.2]} material={panelMat}>
        <boxGeometry args={[0.06, 0.35, 0.12]} />
      </mesh>
      <mesh position={[-0.36, -1.1, 0]} rotation={[0, 0, 0.2]} material={panelMat}>
        <boxGeometry args={[0.06, 0.35, 0.12]} />
      </mesh>
    </group>
  )
}

function RocketFlight() {
  const rocketRef = useRef(null)
  const flameRef = useRef(null)
  const flameOuterMat = useRef(null)
  const flameInnerMat = useRef(null)
  const { viewport } = useThree()

  const flameTexture = useMemo(() => {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    const gradient = ctx.createRadialGradient(
      size / 2,
      size * 0.3,
      10,
      size / 2,
      size * 0.55,
      size * 0.45
    )
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.2, 'rgba(255,224,160,0.95)')
    gradient.addColorStop(0.45, 'rgba(255,156,80,0.8)')
    gradient.addColorStop(0.7, 'rgba(255,90,30,0.45)')
    gradient.addColorStop(1, 'rgba(255,60,20,0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  const { start, end, direction } = useMemo(() => {
    const margin = 3.5
    const start = new THREE.Vector3(-viewport.width / 2 - margin, -viewport.height / 2 - margin, 0)
    const end = new THREE.Vector3(viewport.width / 2 + margin, viewport.height / 2 + margin, 0)
    const direction = new THREE.Vector3().subVectors(end, start).normalize()
    return { start, end, direction }
  }, [viewport.width, viewport.height])

  const duration = 18

  useFrame((state) => {
    if (!rocketRef.current) return
    const t = Math.min(state.clock.getElapsedTime() / duration, 1)
    const pos = new THREE.Vector3().lerpVectors(start, end, t)
    rocketRef.current.position.copy(pos)

    const baseQ = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction
    )
    rocketRef.current.quaternion.copy(baseQ)

    if (flameRef.current) {
      const time = state.clock.getElapsedTime()
      const flicker = 0.9 + Math.sin(time * 18) * 0.08
      const stretch = 1.1 + Math.sin(time * 11) * 0.1
      flameRef.current.scale.set(1, flicker * stretch, 1)

      if (flameOuterMat.current) {
        flameOuterMat.current.opacity = 0.55 + 0.15 * Math.sin(time * 13)
      }
      if (flameInnerMat.current) {
        flameInnerMat.current.opacity = 0.85 + 0.1 * Math.sin(time * 17)
      }
    }
  })

  return (
    <group ref={rocketRef}>
      <RealisticRocket />
      <group ref={flameRef} position={[0, -2.25, 0]}>
        {/* Volumetric flame: crossed planes */}
        <group>
          <mesh>
            <planeGeometry args={[0.6, 1.2]} />
            <meshBasicMaterial
              ref={flameOuterMat}
              map={flameTexture}
              transparent
              opacity={0.6}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              color={new THREE.Color('#ff7a00')}
              toneMapped={false}
            />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.6, 1.2]} />
            <meshBasicMaterial
              map={flameTexture}
              transparent
              opacity={0.6}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              color={new THREE.Color('#ff7a00')}
              toneMapped={false}
            />
          </mesh>
        </group>

        <group position={[0, 0.1, 0]}>
          <mesh>
            <planeGeometry args={[0.35, 0.8]} />
            <meshBasicMaterial
              ref={flameInnerMat}
              map={flameTexture}
              transparent
              opacity={0.85}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              color={new THREE.Color('#ffd166')}
              toneMapped={false}
            />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.35, 0.8]} />
            <meshBasicMaterial
              map={flameTexture}
              transparent
              opacity={0.85}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              color={new THREE.Color('#ffd166')}
              toneMapped={false}
            />
          </mesh>
        </group>

        <pointLight position={[0, -0.2, 0]} intensity={1.5} distance={3.5} color={0xff8a00} />
      </group>
    </group>
  )
}

export default function RocketAnimation() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[6, 8, 5]} intensity={1.2} />
        <directionalLight position={[-5, -3, 4]} intensity={0.4} color={0xffd7a6} />
        <pointLight position={[5, 2, 3]} intensity={0.5} color={0x138808} />

        <RocketFlight />
      </Canvas>
    </div>
  )
}
