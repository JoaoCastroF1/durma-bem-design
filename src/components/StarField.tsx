import { useMemo } from "react";

const StarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: `hsl(230 70% ${70 + Math.random() * 20}%)`,
            "--duration": `${star.duration}s`,
            "--delay": `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
      {/* Ambient orbs */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full animate-breathe"
        style={{
          top: "10%",
          right: "-10%",
          background: "radial-gradient(circle, hsl(230 70% 65% / 0.06), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute w-[250px] h-[250px] rounded-full animate-breathe"
        style={{
          bottom: "20%",
          left: "-5%",
          background: "radial-gradient(circle, hsl(265 50% 55% / 0.05), transparent 70%)",
          filter: "blur(40px)",
          animationDelay: "2s",
        }}
      />
    </div>
  );
};

export default StarField;
