'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export function InnovationScene3D() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    if (!mountRef.current) return

    // WebGL Availability & Reduced Motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const container = mountRef.current
    const width = container.clientWidth || 500
    const height = container.clientHeight || 500

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    } catch (e) {
      console.warn('WebGL initialization fallback:', e)
      setHasWebGL(false)
      return
    }

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 12

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x6366f1, 3, 50)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0x38bdf8, 3, 50)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    // Central Glowing Innovation Core
    const coreGroup = new THREE.Group()
    scene.add(coreGroup)

    // Wireframe Icosahedron Core
    const coreGeo = new THREE.IcosahedronGeometry(2.2, 2)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      wireframe: true,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    coreGroup.add(coreMesh)

    // Inner Glowing Core Sphere
    const innerGeo = new THREE.SphereGeometry(1.2, 32, 32)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: false,
      transparent: true,
      opacity: 0.7,
    })
    const innerMesh = new THREE.Mesh(innerGeo, innerMat)
    coreGroup.add(innerMesh)

    // Orbit Rings
    const ringGeo = new THREE.TorusGeometry(4.2, 0.02, 16, 100)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.4 })
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat)
    ringMesh1.rotation.x = Math.PI / 3
    scene.add(ringMesh1)

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat)
    ringMesh2.rotation.x = -Math.PI / 3
    ringMesh2.rotation.y = Math.PI / 4
    scene.add(ringMesh2)

    // Floating Orbit Nodes (8 Core Concepts)
    const nodes = [
      { text: 'AI', angle: 0, radius: 4.2 },
      { text: 'CODE', angle: Math.PI / 4, radius: 4.2 },
      { text: 'STARTUP', angle: Math.PI / 2, radius: 4.2 },
      { text: 'ROCKET', angle: (3 * Math.PI) / 4, radius: 4.2 },
      { text: 'PROTOTYPE', angle: Math.PI, radius: 4.2 },
      { text: 'MVP', angle: (5 * Math.PI) / 4, radius: 4.2 },
      { text: 'BUSINESS', angle: (3 * Math.PI) / 2, radius: 4.2 },
      { text: 'INNOVATION', angle: (7 * Math.PI) / 4, radius: 4.2 },
    ]

    const nodeGroup = new THREE.Group()
    scene.add(nodeGroup)

    const nodeMeshes: THREE.Mesh[] = []
    const nodeGeo = new THREE.OctahedronGeometry(0.35, 0)
    const nodeMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, metalness: 0.9 })

    nodes.forEach((n) => {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat)
      mesh.position.x = Math.cos(n.angle) * n.radius
      mesh.position.y = Math.sin(n.angle) * n.radius
      mesh.position.z = Math.sin(n.angle * 2) * 0.5
      nodeGroup.add(mesh)
      nodeMeshes.push(mesh)
    })

    // Particle Cloud Background
    const particleCount = 200
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 20
      particlePositions[i + 1] = (Math.random() - 0.5) * 20
      particlePositions[i + 2] = (Math.random() - 0.5) * 20
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x818cf8,
      transparent: true,
      opacity: 0.6,
    })
    const particleSystem = new THREE.Points(particleGeo, particleMat)
    scene.add(particleSystem)

    // Mouse Interaction
    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation Loop
    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (!prefersReducedMotion) {
        coreGroup.rotation.y += 0.005
        coreGroup.rotation.x += 0.003

        ringMesh1.rotation.z += 0.002
        ringMesh2.rotation.z -= 0.002

        nodeGroup.rotation.z += 0.004

        particleSystem.rotation.y += 0.001

        // Parallax Camera Smooth Follow
        camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.05
        camera.position.y += (mouseY * 1.5 - camera.position.y) * 0.05
        camera.lookAt(scene.position)
      }

      renderer.render(scene, camera)
    }

    animate()

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return
      const w = mountRef.current.clientWidth
      const h = mountRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  if (!hasWebGL) {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-gradient-to-tr from-indigo-600 via-violet-500 to-cyan-400 blur-3xl opacity-30 animate-pulse" />
        <div className="absolute h-48 w-48 rounded-full border border-indigo-500/40 bg-indigo-950/40 backdrop-blur-xl flex items-center justify-center shadow-2xl">
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
            INNOVATION CORE
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full min-h-[420px] lg:min-h-[550px]">
      <div ref={mountRef} className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing" />
      
      {/* Floating 3D Orbit Badge Overlay Labels */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-[320px] w-[320px] sm:h-[400px] sm:w-[400px]">
          <span className="absolute top-2 left-6 rounded-full border border-indigo-500/30 bg-slate-950/80 px-2.5 py-1 text-[10px] font-extrabold text-indigo-300 backdrop-blur-md shadow-lg animate-bounce">
            AI / ML
          </span>
          <span className="absolute top-12 right-2 rounded-full border border-violet-500/30 bg-slate-950/80 px-2.5 py-1 text-[10px] font-extrabold text-violet-300 backdrop-blur-md shadow-lg">
            PROTOTYPE
          </span>
          <span className="absolute bottom-16 left-0 rounded-full border border-cyan-500/30 bg-slate-950/80 px-2.5 py-1 text-[10px] font-extrabold text-cyan-300 backdrop-blur-md shadow-lg">
            MVP RELEASE
          </span>
          <span className="absolute bottom-6 right-8 rounded-full border border-emerald-500/30 bg-slate-950/80 px-2.5 py-1 text-[10px] font-extrabold text-emerald-300 backdrop-blur-md shadow-lg">
            STARTUP PITCH
          </span>
        </div>
      </div>
    </div>
  )
}
