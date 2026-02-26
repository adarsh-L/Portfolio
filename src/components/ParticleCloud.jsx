import { useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── Particle cloud (100 particles, very cheap) ─── */
function Particles({ count = 100 }) {
    const meshRef = useRef()

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 14
            pos[i * 3 + 1] = (Math.random() - 0.5) * 8
            pos[i * 3 + 2] = (Math.random() - 0.5) * 6
        }
        return pos
    }, [count])

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.02
        }
    })

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color="#00F7FF"
                transparent
                opacity={0.5}
                sizeAttenuation
            />
        </points>
    )
}

export { Particles }
