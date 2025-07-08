import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isLit: boolean;
  litTime: number;
}

interface Connection {
  nodeA: number;
  nodeB: number;
  distance: number;
}

interface AnimatedPatternBackgroundProps {
  nodeCount?: number;
  maxDistance?: number;
  speed?: number;
  className?: string;
}

export default function AnimatedPatternBackground({
  nodeCount = 50,
  maxDistance = 150,
  speed = 0.5,
  className = ''
}: AnimatedPatternBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const { isDarkMode } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize nodes
  const initializeNodes = (width: number, height: number) => {
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        isLit: false,
        litTime: 0
      });
    }
    nodesRef.current = nodes;
  };

  // Calculate connections between nodes
  const calculateConnections = () => {
    const connections: Connection[] = [];
    const nodes = nodesRef.current;
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          connections.push({
            nodeA: i,
            nodeB: j,
            distance
          });
        }
      }
    }
    connectionsRef.current = connections;
  };

  // Animate nodes
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update node positions
    nodesRef.current.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off edges
      if (node.x < 0 || node.x > width) {
        node.vx *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
      }
      if (node.y < 0 || node.y > height) {
        node.vy *= -1;
        node.y = Math.max(0, Math.min(height, node.y));
      }

      // Randomly light up nodes
      if (Math.random() < 0.002) {
        node.isLit = true;
        node.litTime = Date.now();
      }

      // Turn off lit nodes after 2 seconds
      if (node.isLit && Date.now() - node.litTime > 2000) {
        node.isLit = false;
      }
    });

    // Recalculate connections
    calculateConnections();

    // Draw connections
    ctx.strokeStyle = isDarkMode ? 'rgba(156, 163, 175, 0.3)' : 'rgba(107, 114, 128, 0.3)';
    ctx.lineWidth = 1;
    
    connectionsRef.current.forEach(connection => {
      const nodeA = nodesRef.current[connection.nodeA];
      const nodeB = nodesRef.current[connection.nodeB];
      
      // Calculate opacity based on distance
      const opacity = 1 - (connection.distance / maxDistance);
      
      // Make line brighter if either node is lit
      let lineOpacity = opacity * 0.3;
      if (nodeA.isLit || nodeB.isLit) {
        lineOpacity = opacity * 0.8;
        ctx.strokeStyle = isDarkMode 
          ? `rgba(59, 130, 246, ${lineOpacity})` 
          : `rgba(37, 99, 235, ${lineOpacity})`;
      } else {
        ctx.strokeStyle = isDarkMode 
          ? `rgba(156, 163, 175, ${lineOpacity})` 
          : `rgba(107, 114, 128, ${lineOpacity})`;
      }

      ctx.beginPath();
      ctx.moveTo(nodeA.x, nodeA.y);
      ctx.lineTo(nodeB.x, nodeB.y);
      ctx.stroke();
    });

    // Draw nodes
    nodesRef.current.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.isLit ? 4 : 2, 0, Math.PI * 2);
      
      if (node.isLit) {
        // Glowing effect for lit nodes
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 8);
        gradient.addColorStop(0, isDarkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(37, 99, 235, 0.8)');
        gradient.addColorStop(0.5, isDarkMode ? 'rgba(59, 130, 246, 0.4)' : 'rgba(37, 99, 235, 0.4)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Core of the lit node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode ? '#60a5fa' : '#3b82f6';
        ctx.fill();
      } else {
        // Regular node
        ctx.fillStyle = isDarkMode ? 'rgba(156, 163, 175, 0.6)' : 'rgba(107, 114, 128, 0.6)';
        ctx.fill();
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    setDimensions({ width: rect.width, height: rect.height });
    initializeNodes(rect.width, rect.height);
  };

  useEffect(() => {
    handleResize();
    
    const resizeObserver = new ResizeObserver(handleResize);
    const canvas = canvasRef.current;
    if (canvas) {
      resizeObserver.observe(canvas);
    }

    return () => {
      if (canvas) {
        resizeObserver.unobserve(canvas);
      }
    };
  }, []);

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      calculateConnections();
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}