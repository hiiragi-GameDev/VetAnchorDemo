// 深海パーティクル — ランダムな泡と微光
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 5.3 + 7) % 100}%`,
  size: 6 + (i * 3.7) % 38,
  duration: 14 + (i * 2.3) % 18,
  delay: (i * 1.7) % 12,
}));

export default function Bubbles() {
  return (
    <div className="bubble-container" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="bubble"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
