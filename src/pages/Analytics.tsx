import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingDown, Zap, DollarSign, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { format } from "date-fns";

interface JobHistoryRecord {
  id: string;
  job_name: string;
  cpu_usage: number;
  runtime: number;
  urgency: string;
  region_name: string;
  carbon_intensity: number;
  estimated_energy: number;
  estimated_co2: number;
  estimated_cost: number;
  carbon_saved: number;
  created_at: string;
}

const COLORS = ["#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1"];

const Analytics = () => {
  const [history, setHistory] = useState<JobHistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("job_history")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) throw error;
        setHistory(data || []);
      } catch (error: any) {
        toast.error("Failed to load analytics data");
        console.error("Analytics fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No data available yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Schedule some jobs to see analytics
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate summary statistics
  const totalCO2 = history.reduce((sum, job) => sum + parseFloat(job.estimated_co2.toString()), 0);
  const totalSaved = history.reduce((sum, job) => sum + parseFloat(job.carbon_saved.toString()), 0);
  const totalCost = history.reduce((sum, job) => sum + parseFloat(job.estimated_cost.toString()), 0);
  const totalEnergy = history.reduce((sum, job) => sum + parseFloat(job.estimated_energy.toString()), 0);

  // Region distribution
  const regionStats = history.reduce((acc, job) => {
    const region = job.region_name;
    if (!acc[region]) {
      acc[region] = { name: region, count: 0, co2: 0 };
    }
    acc[region].count++;
    acc[region].co2 += parseFloat(job.estimated_co2.toString());
    return acc;
  }, {} as Record<string, { name: string; count: number; co2: number }>);

  const regionData = Object.values(regionStats);

  // Urgency distribution
  const urgencyStats = history.reduce((acc, job) => {
    const urgency = job.urgency;
    if (!acc[urgency]) {
      acc[urgency] = 0;
    }
    acc[urgency]++;
    return acc;
  }, {} as Record<string, number>);

  const urgencyData = Object.entries(urgencyStats).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  // Time series data (carbon over time)
  const timeSeriesData = history.map((job) => ({
                    date: format(new Date(job.created_at), "MMM dd"),
                    co2: parseFloat(job.estimated_co2.toString()),
                    saved: parseFloat(job.carbon_saved.toString()),
  }));

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
            <p className="text-sm text-muted-foreground">
              Visualize your environmental impact
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total CO₂
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCO2.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">kg emitted</p>
            </CardContent>
          </Card>

          <Card className="border-primary/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  CO₂ Saved
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalSaved.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">kg saved vs avg</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Cost
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalCost.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">spent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Energy Used
                </CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEnergy.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">kWh</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CO₂ by Region */}
          <Card>
            <CardHeader>
              <CardTitle>CO₂ Emissions by Region</CardTitle>
              <CardDescription>Total carbon emissions per data center</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={12} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="co2" fill="hsl(var(--primary))" name="CO₂ (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Urgency Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Jobs by Urgency</CardTitle>
              <CardDescription>Distribution of job priorities</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={urgencyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: any) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {urgencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Carbon Over Time */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Carbon Emissions Over Time</CardTitle>
              <CardDescription>Track your environmental impact across jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="co2"
                    stroke="hsl(var(--destructive))"
                    name="CO₂ Emitted (kg)"
                  />
                  <Line
                    type="monotone"
                    dataKey="saved"
                    stroke="hsl(var(--primary))"
                    name="CO₂ Saved (kg)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
