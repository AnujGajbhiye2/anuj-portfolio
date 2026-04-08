import Badge from "../components/ui/Badge";

export default function TestBadges() {
  const technologies = ['React', 'TypeScript', 'Tailwind', 'Node.js'];
  
  return (
    <div className="space-y-4">
      {/* Variants */}
      <div className="flex gap-2">
        <Badge>Default</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="subtle">Subtle</Badge>
      </div>
      
      {/* Sizes */}
      <div className="flex gap-2 items-center">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
      </div>
      
      {/* Real-world usage: Tech stack */}
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Badge key={tech} variant="outline">{tech}</Badge>
        ))}
      </div>
    </div>
  );
}