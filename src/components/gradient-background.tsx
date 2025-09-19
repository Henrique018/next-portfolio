const Glow = ({ className }: { className?: string }) => {
  return <div className={`glow ${className}`} />;
};

type GradientBackgroundProps = {
  as?: keyof React.JSX.IntrinsicElements;
  children: React.ReactNode;
};

const GradientBackground = ({ as = 'div', children }: GradientBackgroundProps) => {
  const Tag = as;

  return (
    <Tag className="gradient-bg z-0">
      <Glow className="glow-blue pointer-events-none" />
      <Glow className="glow-purple pointer-events-none" />
      <div className="z-10">{children}</div>
    </Tag>
  );
};

export default GradientBackground;
