export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-blue-900/20"></div>
      <div className="stars"></div>
      <div className="twinkling"></div>
    </div>
  );
}
