import  { Button } from "../components/ui/Button";
import Card, { CardHeader, CardContent, CardFooter } from "../components/ui/Card";


export default function TestCards() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Full card */}
      <Card>
        <CardHeader>
          <h3 className="font-bold text-text-primary">Card Title</h3>
          <p className="text-sm text-text-muted">Subtitle here</p>
        </CardHeader>
        <CardContent>
          <p>This is the card content. It can contain anything.</p>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm">Cancel</Button>
          <Button size="sm">Save</Button>
        </CardFooter>
      </Card>
      
      {/* Content only */}
      <Card>
        <CardContent>
          <p>Simple card with just content.</p>
        </CardContent>
      </Card>
      
      {/* Interactive */}
      <Card variant="interactive" onClick={() => alert('Clicked!')}>
        <CardContent>
          <p>Click me! I'm interactive.</p>
        </CardContent>
      </Card>
      
      {/* Selected */}
      <Card variant="selected">
        <CardContent>
          <p>I'm selected!</p>
        </CardContent>
      </Card>
    </div>
  );
}