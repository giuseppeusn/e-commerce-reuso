import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Box, RotateCw } from "lucide-react";
import VisualizadorImagem from "./VisualizadorImagem";

interface Visualizador3DProps {
  produto: {
    nome: string;
    fotos?: string[];
  };
}

export const Visualizador3D: React.FC<Visualizador3DProps> = ({ produto }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Verificar suporte a WebGL
    try {
      const canvasTest = document.createElement("canvas");
      const gl = canvasTest.getContext("webgl") || canvasTest.getContext("experimental-webgl");
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 192;

    // 1. Cena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f4f6); // Gray-100 suave

    // 2. Câmera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 3.2);
    camera.lookAt(0, 0, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 4. Iluminação Studio 3D
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x93c5fd, 0.9); // Rim light azul suave
    dirLight2.position.set(-3, -2, -2);
    scene.add(dirLight2);

    // 5. Grupo do Produto 3D
    const group = new THREE.Group();
    scene.add(group);

    // Geometria e Materiais do Produto
    const boxGeometry = new THREE.BoxGeometry(1.4, 1.4, 0.35);

    // Carregar textura da foto do produto, se disponível
    const fotoUrl = produto.fotos && produto.fotos.length > 0 ? produto.fotos[0] : "";
    let frontMaterial: THREE.Material;

    const sideMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.6,
      roughness: 0.3,
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.4,
      roughness: 0.4,
    });

    if (fotoUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.setCrossOrigin("anonymous");
      const texture = textureLoader.load(
        fotoUrl,
        () => {
          texture.colorSpace = THREE.SRGBColorSpace;
          renderer.render(scene, camera);
        },
        undefined,
        () => {
          // Fallback se a imagem externa bloquear CORS
        }
      );

      frontMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.3,
        metalness: 0.1,
      });
    } else {
      frontMaterial = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        roughness: 0.3,
        metalness: 0.5,
      });
    }

    // [right, left, top, bottom, front, back]
    const materials = [
      sideMaterial,
      sideMaterial,
      sideMaterial,
      sideMaterial,
      frontMaterial,
      backMaterial,
    ];

    const mesh = new THREE.Mesh(boxGeometry, materials);
    group.add(mesh);

    // Base de sombra suave abaixo do modelo
    const shadowGeo = new THREE.PlaneGeometry(1.6, 1.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.08,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.9;
    scene.add(shadowMesh);

    // 6. Interação com Mouse / Touch para rotação 3D
    let dragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotSpeedX = 0;
    let rotSpeedY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      dragging = true;
      setIsDragging(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      rotSpeedY = deltaX * 0.008;
      rotSpeedX = deltaY * 0.008;

      group.rotation.y += rotSpeedY;
      group.rotation.x += rotSpeedX;
    };

    const handleMouseUp = () => {
      dragging = false;
      setIsDragging(false);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Suporte a Touch em dispositivos móveis
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        dragging = true;
        setIsDragging(true);
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      rotSpeedY = deltaX * 0.008;
      rotSpeedX = deltaY * 0.008;

      group.rotation.y += rotSpeedY;
      group.rotation.x += rotSpeedX;
    };

    const handleTouchEnd = () => {
      dragging = false;
      setIsDragging(false);
    };

    domElement.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // 7. Loop de Animação
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto-rotação sutil quando o usuário não estiver arrastando
      if (!dragging) {
        group.rotation.y += 0.008;
        // Leve amortecimento
        rotSpeedX *= 0.95;
        rotSpeedY *= 0.95;
        group.rotation.x += rotSpeedX;
      }

      // Leve flutuação vertical estética
      const elapsedTime = clock.getElapsedTime();
      mesh.position.y = Math.sin(elapsedTime * 1.5) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Redimensionamento Responsivo
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup completo ao desmontar o componente
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      domElement.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      boxGeometry.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      materials.forEach((m) => m.dispose());
      renderer.dispose();

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [produto]);

  if (!webGlSupported) {
    return <VisualizadorImagem produto={produto} />;
  }

  return (
    <div
      ref={containerRef}
      className={`w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      title="Clique e arraste para girar em 3D"
    >
      {/* Badge indicativa de Variabilidade 3D */}
      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold shadow-md pointer-events-none transition-all">
        <Box className="w-3.5 h-3.5 text-blue-400" />
        <span>Visualizador 3D</span>
      </div>

      {/* Dica de interação interativa no rodapé */}
      <div className="absolute bottom-2 inset-x-0 z-10 flex justify-center pointer-events-none">
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/70 backdrop-blur-sm text-[11px] text-gray-600 font-medium shadow-xs">
          <RotateCw className="w-2.5 h-2.5 animate-spin text-gray-500" style={{ animationDuration: "6s" }} />
          Arraste para girar em 3D
        </span>
      </div>
    </div>
  );
};

export default Visualizador3D;
