import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Leaf, TrendingDown, Zap } from "lucide-react";
import { Region } from "@/types/scheduler";
import { getRegions } from "@/lib/mockApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Dashboard = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRegions().then((data) => {
      setRegions(data);
      setLoading(false);
    });
  }, []);

  const avgCarbonIntensity = regions.length
    ? Math.round(regions.reduce((sum, r) => sum + r.carbonIntensity, 0) / regions.length)
    : 0;

  const greenScore = regions.length
    ? Math.round((1 - avgCarbonIntensity / 500) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl p-8 md:p-12 gradient-eco shadow-eco-glow"
      >
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Schedule Smarter, Compute Greener
          </h2>
          <p className="text-white/90 text-lg max-w-2xl">
            Optimize your cloud workloads for minimal carbon emissions while maintaining peak performance.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <TooltipProvider>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-eco-glow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Green Score</CardTitle>
                  <Tooltip>
                    <TooltipTrigger>
                      <Leaf className="h-4 w-4 text-primary" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Overall environmental efficiency rating</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-10 w-20" />
                ) : (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">{greenScore}</span>
                    <span className="text-lg text-muted-foreground">/100</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Carbon</CardTitle>
                  <Tooltip>
                    <TooltipTrigger>
                      <Cloud className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Average carbon intensity across regions (gCO2/kWh)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-10 w-24" />
                ) : (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{avgCarbonIntensity}</span>
                    <span className="text-sm text-muted-foreground">gCO₂/kWh</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Regions</CardTitle>
                  <Tooltip>
                    <TooltipTrigger>
                      <Zap className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Available data center regions</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-10 w-12" />
                ) : (
                  <span className="text-3xl font-bold">{regions.length}</span>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Best Option</CardTitle>
                  <Tooltip>
                    <TooltipTrigger>
                      <TrendingDown className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Lowest carbon intensity region</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-10 w-32" />
                ) : (
                  <p className="text-lg font-semibold truncate">
                    {[...regions].sort((a, b) => a.carbonIntensity - b.carbonIntensity)[0]?.location || "N/A"}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TooltipProvider>
      </div>

      {/* Regions Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Available Regions</CardTitle>
            <CardDescription>Choose from eco-friendly data centers worldwide</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {regions.map((region, index) => (
                  <motion.div
                    key={region.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors bg-card"
                  >
                    <div className="flex-1 mb-3 sm:mb-0">
                      <h4 className="font-semibold text-foreground">{region.name}</h4>
                      <p className="text-sm text-muted-foreground">{region.location}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={region.carbonIntensity < 100 ? "default" : "secondary"} className="font-mono">
                        {region.carbonIntensity} gCO₂
                      </Badge>
                      <Badge variant="outline" className="font-mono">
                        ${region.cost}/hr
                      </Badge>
                      <Badge variant="outline" className="font-mono">
                        {region.latency}ms
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
