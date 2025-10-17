import { Check, Sparkles, Building2, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams and projects",
      price: "$49",
      period: "/month",
      icon: Sparkles,
      features: [
        "Up to 5 projects",
        "100 jobs per month",
        "Basic carbon tracking",
        "Email support",
        "Community access",
        "Basic analytics dashboard"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      description: "For growing teams with higher demands",
      price: "$199",
      period: "/month",
      icon: Building2,
      features: [
        "Unlimited projects",
        "1,000 jobs per month",
        "Advanced carbon analytics",
        "Priority support (24/7)",
        "Custom integrations",
        "API access",
        "Advanced scheduling algorithms",
        "Carbon offset recommendations"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      price: "Custom",
      period: "",
      icon: HeartHandshake,
      features: [
        "Unlimited everything",
        "Dedicated account manager",
        "Custom SLA agreements",
        "On-premise deployment option",
        "White-label solutions",
        "Compliance reporting",
        "DevOps pipeline integration",
        "Carbon footprint audits",
        "Professional consulting services"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const usageBasedFeatures = [
    "Pay only for what you use",
    "$0.05 per job executed",
    "$10 per TB of data processed",
    "Bonus credits for carbon savings achieved",
    "Volume discounts available"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto text-center max-w-4xl">
            <Badge className="mb-4 gradient-eco text-white border-0">Pricing</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Choose Your Plan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing options to match your needs. Start reducing your carbon footprint while optimizing costs.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <Card 
                    key={plan.name} 
                    className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-eco-glow scale-105' : ''}`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-eco text-white border-0">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center pb-8">
                      <div className="mx-auto p-3 rounded-lg gradient-eco w-fit mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => navigate("/auth")}
                      >
                        {plan.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Usage-Based Pricing */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Usage-Based Pricing</h2>
              <p className="text-muted-foreground">
                Need more flexibility? Pay only for what you use with our usage-based model.
              </p>
            </div>
            <Card className="shadow-eco-glow">
              <CardHeader>
                <CardTitle className="text-center">Consumption Model</CardTitle>
                <CardDescription className="text-center">
                  Perfect for variable workloads and seasonal demands
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {usageBasedFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="outline" onClick={() => navigate("/auth")}>
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Professional Services</h2>
              <p className="text-muted-foreground">
                Expert consulting to maximize your carbon and cost savings
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Integration Services</CardTitle>
                  <CardDescription>Seamless integration into your existing infrastructure</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>DevOps pipeline integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Custom API development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Team training and onboarding</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Carbon Audits</CardTitle>
                  <CardDescription>Comprehensive analysis of your compute carbon footprint</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Full infrastructure assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Optimization recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Compliance reporting</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 gradient-eco text-white">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-white/90 mb-8 text-lg">
              Join companies worldwide in building a sustainable digital future while reducing costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={() => navigate("/auth")}>
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
