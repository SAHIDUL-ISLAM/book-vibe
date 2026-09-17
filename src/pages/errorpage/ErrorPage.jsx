import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, HelpCircle, FileText, Activity } from 'lucide-react';

export default function NotFound() {
  const canvasRef = useRef(null);

  // Interactive Particle Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: null, y: null, radius: 150 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const colors = ['#a855f7', '#ec4899', '#3b82f6', '#8b5cf6', '#6366f1'];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = dx / distance;
            const directionY = dy / distance;

            this.x -= directionX * force * 5;
            this.y -= directionY * force * 5;
          }
        }
      }
    }

    const particleCount = Math.floor((width * height) / 9000);
    const particles = Array.from({ length: particleCount }, () => new Particle());

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = 1 - distance / 120;
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center overflow-hidden font-sans">
      {/* Interactive Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Ambient Color Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/25 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none" />

      {/* Main Glass Card */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-xl mx-4 p-8 sm:p-12 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] text-center"
      >
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-purple-300 mb-6 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          System Error
        </div>

        {/* 404 Heading */}
        <h1 className="text-8xl sm:text-9xl font-black tracking-tight bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent select-none drop-shadow-2xl mb-2">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Lost in Digital Space
        </h2>

        {/* Description */}
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          The page you are looking for was swallowed by a black hole or moved to another dimension. Let&apos;s get you back on track!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:opacity-90 shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Return Home
          </motion.a>
        </div>

        {/* Quick Help Links */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-6 text-xs text-slate-500">
          <a href="/support" className="hover:text-slate-300 transition-colors flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> Support
          </a>
          <span>•</span>
          <a href="/docs" className="hover:text-slate-300 transition-colors flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" /> Docs
          </a>
          <span>•</span>
          <a href="/status" className="hover:text-slate-300 transition-colors flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" /> Status
          </a>
        </div>
      </motion.main>
    </div>
  );
}