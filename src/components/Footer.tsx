import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Leaf className="h-4 w-4 text-primary" />
            <span>Powered by <span className="font-semibold text-foreground">Green Cloud Scheduler</span></span>
          </div>
          <p className="text-xs text-muted-foreground text-center sm:text-right">
            © 2025 Green Cloud Scheduler. Building a sustainable digital future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
