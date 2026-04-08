

const ConnectionLine = () => {
  const now = new Date();
  const dateStr = now.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return <div className="mb-6 text-sm">
    <div className="text-text-dim">
      <span className="text-text-muted">Last login:</span> {dateStr} on ttys000
    </div>
    <div className="text-text-secondary">
      <span className="text-primary-600">visitor</span>
      <span className="text-text-dim">@</span>
      <span className="text-text-muted">portfolio</span>
      <span className="text-text-dim"> ~ % </span>
      <span className="text-text-primary">ssh anuj.dev</span>
    </div>
  </div>;
};

export default ConnectionLine;
