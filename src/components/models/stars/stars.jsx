import { useEffect, useRef } from "react";

const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    
    const numStars = 500; 
    const radius = Math.min(cx, cy) * 1.5;

    const stars = Array.from({ length: numStars }).map(() => {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = radius * Math.cbrt(Math.random());

      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        size: Math.random() * 0.5 + 0.2,
      };
    });

    let rotX = 0;
    let rotY = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "white";

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        
        const x1 = star.x * cosY - star.z * sinY;
        const z1 = star.x * sinY + star.z * cosY;

        
        const y1 = star.y * cosX - z1 * sinX;
        const z2 = star.y * sinX + z1 * cosX;

        
        const fov = 800;
        const scale = fov / (fov + z2);
        const x2d = cx + x1 * scale;
        const y2d = cy + y1 * scale;

        ctx.beginPath();
        ctx.arc(x2d, y2d, star.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      rotX += 0.0005; 
      rotY += 0.0007;

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        backgroundColor: "transparent",
      }}
    />
  );
};

export default StarBackground;
