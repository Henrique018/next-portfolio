const Glow = ({ className }: { className?: string }) => {
  return <div className={`glow ${className}`} />;
};

type GradientBackgroundProps = {
  children: React.ReactNode;
};

const GradientBackground = ({ children }: GradientBackgroundProps) => {
  return (
    <div className="gradient-bg relative z-0">
      <Glow className="glow-blue pointer-events-none" />
      <Glow className="glow-purple pointer-events-none" />
      <div className="z-10">{children}</div>
    </div>
  );
};

export default GradientBackground;
