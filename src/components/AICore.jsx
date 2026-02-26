import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * AICore – the rotating neural sphere at the center of the Hero section.
 * Uses low-poly geometry + MeshStandardMaterial with emissive glow.
 * Kept intentionally simple for performance.
 */
export default function AICore() {
    const groupRef = useRef()
    const sphereRef = useRef()
    const ringRef1 = useRef()
    const ringRef2 = useRef()

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()

        // Gentle floating
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(t * 0.4) * 0.12
        }

        // Slow sphere rotation
        if (sphereRef.current) {
            sphereRef.current.rotation.y = t * 0.15
            sphereRef.current.rotation.x = t * 0.08
        }

        // Orbit rings rotate on different axes
        if (ringRef1.current) ringRef1.current.rotation.z = t * 0.25
        if (ringRef2.current) ringRef2.current.rotation.x = t * 0.2
    })

    return (
        <group ref={groupRef}>
            {/* Wireframe sphere */}
            <mesh ref={sphereRef}>
                <sphereGeometry args={[1.2, 16, 16]} />
                <meshStandardMaterial
                    color="#00F7FF"
                    emissive="#00F7FF"
                    emissiveIntensity={0.35}
                    wireframe
                    transparent
                    opacity={0.55}
                />
            </mesh>

            {/* Solid inner sphere (subtle) */}
            <mesh>
                <sphereGeometry args={[0.9, 12, 12]} />
                <meshStandardMaterial
                    color="#6366F1"
                    emissive="#6366F1"
                    emissiveIntensity={0.2}
                    transparent
                    opacity={0.25}
                    roughness={0.4}
                    metalness={0.6}
                />
            </mesh>

            {/* Orbit ring 1 */}
            <mesh ref={ringRef1} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.6, 0.012, 8, 64]} />
                <meshStandardMaterial
                    color="#00F7FF"
                    emissive="#00F7FF"
                    emissiveIntensity={0.6}
                    transparent
                    opacity={0.5}
                />
            </mesh>

            {/* Orbit ring 2 */}
            <mesh ref={ringRef2} rotation={[0.4, 0.8, 0]}>
                <torusGeometry args={[1.8, 0.008, 8, 64]} />
                <meshStandardMaterial
                    color="#6366F1"
                    emissive="#6366F1"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Ambient point glow */}
            <pointLight color="#00F7FF" intensity={1.5} distance={6} />
            <pointLight color="#6366F1" intensity={0.8} distance={4} position={[2, 1, 1]} />
        </group>
    )
}
