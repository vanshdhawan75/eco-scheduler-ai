import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { History as HistoryIcon, Trash2, Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";

interface JobHistoryRecord {
  id: string;
  job_name: string;
  cpu_usage: number;
  runtime: number;
  urgency: string;
  region_name: string;
  region_location: string;
  carbon_intensity: number;
  estimated_energy: number;
  estimated_co2: number;
  estimated_cost: number;
  carbon_saved: number;
  created_at: string;
}

const History = () => {
  const [history, setHistory] = useState<JobHistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("job_history")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error: any) {
      toast.error("Failed to load history");
      console.error("History fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  const deleteJob = async (id: string) => {
    try {
      const { error } = await supabase.from("job_history").delete().eq("id", id);

      if (error) throw error;

      setHistory(history.filter((job) => job.id !== id));
      toast.success("Job deleted successfully");
    } catch (error: any) {
      toast.error("Failed to delete job");
    }
  };

  const exportToCSV = () => {
    if (history.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = [
      "Job Name",
      "Date",
      "CPU Cores",
      "Runtime (h)",
      "Urgency",
      "Region",
      "Location",
      "Carbon (gCO₂/kWh)",
      "Energy (kWh)",
      "CO₂ (kg)",
      "Cost ($)",
      "Saved (kg CO₂)",
    ];

    const rows = history.map((job) => [
      job.job_name,
      format(new Date(job.created_at), "yyyy-MM-dd HH:mm"),
      job.cpu_usage,
      job.runtime,
      job.urgency,
      job.region_name,
      job.region_location,
      job.carbon_intensity,
      job.estimated_energy.toFixed(2),
      job.estimated_co2.toFixed(2),
      job.estimated_cost.toFixed(2),
      job.carbon_saved.toFixed(2),
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `green-cloud-history-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();

    toast.success("History exported successfully");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-eco-glow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HistoryIcon className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Job History</CardTitle>
                  <CardDescription>View all your scheduled workloads</CardDescription>
                </div>
              </div>
              {history.length > 0 && (
                <Button onClick={exportToCSV} variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <div className="text-center py-12">
                <HistoryIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No jobs scheduled yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Your scheduled jobs will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{job.job_name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(job.created_at), "PPp")}
                          </p>
                        </div>
                        <Badge
                          variant={job.urgency === "high" ? "destructive" : "secondary"}
                          className="capitalize"
                        >
                          {job.urgency}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Region:</span>{" "}
                          <span className="font-medium">{job.region_name}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Location:</span>{" "}
                          <span className="font-medium">{job.region_location}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">CPU:</span>{" "}
                          <span className="font-medium">{job.cpu_usage} cores</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Runtime:</span>{" "}
                          <span className="font-medium">{job.runtime}h</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <Badge variant="outline" className="font-mono">
                          {job.carbon_intensity} gCO₂/kWh
                        </Badge>
                        <Badge variant="outline" className="font-mono">
                          {job.estimated_co2.toFixed(2)} kg CO₂
                        </Badge>
                        <Badge variant="outline" className="font-mono">
                          ${job.estimated_cost.toFixed(2)}
                        </Badge>
                        {job.carbon_saved > 0 && (
                          <Badge className="gradient-eco text-white font-mono">
                            -{job.carbon_saved.toFixed(2)} kg CO₂
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2 sm:justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteJob(job.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

export default History;
