import { motion } from "framer-motion";
import { MapPin, Zap, DollarSign, Leaf, TrendingDown } from "lucide-react";
import { ScheduleResult } from "@/types/scheduler";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ResultSectionProps {
  result: ScheduleResult;
}

const ResultSection = ({ result }: ResultSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Success Banner */}
      <Card className="border-primary/50 bg-success-light shadow-eco-glow">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-success-dark mb-1">
                Optimal Region Found!
              </h3>
              <p className="text-success-dark/80">
                Your workload has been scheduled to the most eco-friendly data center.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Region Details */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Region</CardTitle>
          <CardDescription>Best match for your workload requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-2xl font-bold text-foreground mb-1">
                {result.region.name}
              </h4>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{result.region.location}</span>
              </div>
            </div>
            <Badge className="gradient-eco text-white">
              Best Choice
            </Badge>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Carbon Intensity</p>
              <p className="text-lg font-semibold text-foreground">
                {result.region.carbonIntensity} gCO₂/kWh
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Availability</p>
              <p className="text-lg font-semibold text-foreground">
                {result.region.availability}%
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Latency</p>
              <p className="text-lg font-semibold text-foreground">
                {result.region.latency} ms
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Cost Rate</p>
              <p className="text-lg font-semibold text-foreground">
                ${result.region.cost}/hour
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-success-light to-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-success-dark">Energy Usage</CardTitle>
                <Zap className="h-4 w-4 text-success-dark" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-success-dark">
                {result.estimatedEnergy.toFixed(2)}
              </p>
              <p className="text-xs text-success-dark/70 mt-1">kWh</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-success-light to-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-success-dark">CO₂ Emissions</CardTitle>
                <TrendingDown className="h-4 w-4 text-success-dark" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-success-dark">
                {result.estimatedCO2.toFixed(2)}
              </p>
              <p className="text-xs text-success-dark/70 mt-1">kg CO₂</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-success-light to-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-success-dark">Estimated Cost</CardTitle>
                <DollarSign className="h-4 w-4 text-success-dark" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-success-dark">
                ${result.estimatedCost.toFixed(2)}
              </p>
              <p className="text-xs text-success-dark/70 mt-1">total</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="gradient-eco text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white">Carbon Saved</CardTitle>
                <Leaf className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">
                {result.carbonSaved.toFixed(2)}
              </p>
              <p className="text-xs text-white/80 mt-1">kg CO₂ vs. avg</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Environmental Impact */}
      {result.carbonSaved > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-primary/30">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Great choice!</span> You're saving{" "}
                    <span className="font-bold text-primary">{result.carbonSaved.toFixed(2)} kg CO₂</span>{" "}
                    compared to the average data center. That's equivalent to{" "}
                    <span className="font-semibold">
                      {(result.carbonSaved * 0.00045).toFixed(1)} trees planted
                    </span>
                    ! 🌳
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResultSection;
