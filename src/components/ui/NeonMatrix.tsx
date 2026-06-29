import { useEffect, useRef } from 'react';

interface CellData {
  char: string;
  opacity: number;
  color: { r: number; g: number; b: number };
  timer: number;
  maxTimer: number;
}

const PALETTE = [
  { r: 0, g: 170, b: 170 },
  { r: 0, g: 220, b: 255 },
  { r: 0, g: 136, b: 255 },
  { r: 200, g: 220, b: 255 },
];

const chars = "\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F2\u30F3";

const config = {
  fadeRate: 0.5,
  gridSize: 25,
  scrambleRate: 0.02,
  damping: 0.1,
};

function createCell(): CellData {
  const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  const maxTimer = Math.random() * 60 + 20;
  return {
    char: chars[Math.floor(Math.random() * chars.length)],
    opacity: Math.random() * 0.5 + 0.5,
    color: { r: color.r, g: color.g, b: color.b },
    timer: maxTimer,
    maxTimer: maxTimer,
  };
}

function scrambleCell(cell: CellData) {
  cell.char = chars[Math.floor(Math.random() * chars.length)];
  const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  cell.color = { r: color.r, g: color.g, b: color.b };
  cell.opacity = Math.random() * 0.5 + 0.5;
  cell.maxTimer = Math.random() * 60 + 20;
  cell.timer = cell.maxTimer;
}

function updateCell(cell: CellData) {
  cell.timer--;
  if (cell.timer <= 0) {
    scrambleCell(cell);
  } else {
    cell.opacity *= 0.95;
  }
}

export default function NeonMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rafRef = useRef<number>(0);
  const cellsRef = useRef<CellData[]>([]);
  const gridColsRef = useRef(0);
  const gridRowsRef = useRef(0);
  const dprRef = useRef(1);
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function initGrid() {
      if (!canvas) return;
      rectRef.current = canvas.getBoundingClientRect();
      const rect = rectRef.current;
      dprRef.current = window.devicePixelRatio || 1;
      canvas.width = rect.width * dprRef.current;
      canvas.height = rect.height * dprRef.current;
      gridColsRef.current = Math.ceil(rect.width / config.gridSize);
      gridRowsRef.current = Math.ceil(rect.height / config.gridSize);
      cellsRef.current = [];
      for (let y = 0; y < gridRowsRef.current; y++) {
        for (let x = 0; x < gridColsRef.current; x++) {
          cellsRef.current.push(createCell());
        }
      }
    }

    function drawGrid() {
      if (!ctx || !canvas) return;
      const dpr = dprRef.current;
      const gridCols = gridColsRef.current;
      const gridRows = gridRowsRef.current;
      const cells = cellsRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = `rgba(11, 12, 16, ${config.fadeRate})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const rect = rectRef.current;
      if (rect) {
        mouse.x += (mouse.targetX - mouse.x) * config.damping;
        mouse.y += (mouse.targetY - mouse.y) * config.damping;
        const tiltX = (mouse.x - rect.width / 2) / rect.width;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(tiltX * 0.1);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
      }

      ctx.strokeStyle = 'rgba(0, 136, 153, 0.2)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= gridCols; x++) {
        for (let y = 0; y <= gridRows; y++) {
          ctx.strokeRect(
            x * config.gridSize * dpr,
            y * config.gridSize * dpr,
            config.gridSize * dpr,
            config.gridSize * dpr
          );
        }
      }

      ctx.font = `${14 * dpr}px monospace`;
      ctx.textAlign = 'center';
      for (let i = 0; i < cells.length; i++) {
        if (Math.random() < config.scrambleRate) {
          scrambleCell(cells[i]);
        }
        updateCell(cells[i]);
        const x = (i % gridCols) * config.gridSize * dpr;
        const y = Math.floor(i / gridCols) * config.gridSize * dpr;
        const cx = x + (config.gridSize * dpr) / 2;
        ctx.fillText(cells[i].char, cx, y + (config.gridSize * dpr) * 0.75);
        ctx.fillStyle = `rgba(${cells[i].color.r}, ${cells[i].color.g}, ${cells[i].color.b}, ${cells[i].opacity})`;
        ctx.fillText(cells[i].char, cx, y + (config.gridSize * dpr) * 0.75);
      }

      ctx.restore();
    }

    function animate() {
      drawGrid();
      rafRef.current = requestAnimationFrame(animate);
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas?.getBoundingClientRect();
      if (rect) {
        mouseRef.current.targetX = e.clientX - rect.left;
        mouseRef.current.targetY = e.clientY - rect.top;
      }
    }

    let resizeTimeout: ReturnType<typeof setTimeout>;
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(initGrid, 100);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const initTimeout = setTimeout(() => {
      initGrid();
      animate();
    }, 100);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      clearTimeout(initTimeout);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
