import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Loader2, Send } from "lucide-react";
import { Job, ScheduleResult } from "@/types/scheduler";
import { scheduleJob } from "@/lib/mockApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ResultSection from "./ResultSection";
import { toast } from "sonner";

const JobScheduler = () => {
  const [result, setResult] = useState<ScheduleResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Job>({
    defaultValues: {
      name: "",
      cpuUsage: 2,
      runtime: 1,
      urgency: "medium",
    },
  });

  const urgency = watch("urgency");

  const onSubmit = async (data: Job) => {
    setLoading(true);
    setResult(null);
    
    try {
      const scheduledResult = await scheduleJob(data);
      setResult(scheduledResult);
      toast.success("Job scheduled successfully!", {
        description: `Optimal region: ${scheduledResult.region.name}`,
      });
    } catch (error) {
      toast.error("Failed to schedule job", {
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-eco-glow">
          <CardHeader>
            <CardTitle>Schedule Your Workload</CardTitle>
            <CardDescription>
              Enter your job details and we'll find the greenest data center for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Job Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Data Processing Pipeline"
                  {...register("name", { required: "Job name is required" })}
                  className="focus-visible:ring-primary"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <TooltipProvider>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="cpuUsage">CPU Cores</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-xs text-muted-foreground cursor-help">(?)</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Number of CPU cores required for your job</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                  <Input
                    id="cpuUsage"
                    type="number"
                    min="1"
                    max="128"
                    {...register("cpuUsage", { 
                      required: "CPU usage is required",
                      min: { value: 1, message: "Minimum 1 core" },
                      max: { value: 128, message: "Maximum 128 cores" },
                    })}
                    className="focus-visible:ring-primary"
                  />
                  {errors.cpuUsage && (
                    <p className="text-sm text-destructive">{errors.cpuUsage.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <TooltipProvider>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="runtime">Runtime (hours)</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-xs text-muted-foreground cursor-help">(?)</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Expected duration of your workload</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                  <Input
                    id="runtime"
                    type="number"
                    min="0.1"
                    step="0.1"
                    {...register("runtime", { 
                      required: "Runtime is required",
                      min: { value: 0.1, message: "Minimum 0.1 hours" },
                    })}
                    className="focus-visible:ring-primary"
                  />
                  {errors.runtime && (
                    <p className="text-sm text-destructive">{errors.runtime.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <TooltipProvider>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-xs text-muted-foreground cursor-help">(?)</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>High urgency prioritizes latency over carbon savings</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
                <Select
                  value={urgency}
                  onValueChange={(value) => setValue("urgency", value as Job["urgency"])}
                >
                  <SelectTrigger className="focus:ring-primary">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Maximize carbon savings</SelectItem>
                    <SelectItem value="medium">Medium - Balanced</SelectItem>
                    <SelectItem value="high">High - Minimize latency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-eco hover:opacity-90 transition-opacity"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finding Best Region...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Schedule Job
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {result && <ResultSection result={result} />}
    </div>
  );
};

export default JobScheduler;
