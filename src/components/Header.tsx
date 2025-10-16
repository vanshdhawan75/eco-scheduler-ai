import { Leaf } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg gradient-eco">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Green Cloud Scheduler</h1>
            <p className="text-xs text-muted-foreground">Smart. Sustainable. Efficient.</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-success-light">
          <div className="w-2 h-2 rounded-full bg-success-dark animate-pulse-slow"></div>
          <span className="text-sm font-medium text-success-dark">Live Carbon Tracking</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
