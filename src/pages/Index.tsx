import { Link } from "react-router-dom";
import { ArrowRight, FileText, Zap, Download, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Create professional invoices in under 2 minutes with our intuitive builder.",
    },
    {
      icon: FileText,
      title: "Live Preview",
      description: "See your invoice update in real-time as you fill in the details.",
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description: "Download as PDF, print directly, or save for later editing.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "All data stays in your browser. No accounts, no servers, no worries.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="container relative py-24 md:py-32 lg:py-40">
            <div className="max-w-3xl mx-auto text-center">
              <h1 
                className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 animate-fade-up"
                style={{ animationDelay: '0.1s' }}
              >
                Generate Professional Invoices{" "}
                <span className="text-accent">Instantly</span>
              </h1>
              <p 
                className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-up"
                style={{ animationDelay: '0.2s' }}
              >
                Create, preview, and download beautiful invoices in seconds. 
                No sign-up required. Free forever.
              </p>
              <div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
                style={{ animationDelay: '0.3s' }}
              >
                <Link to="/builder">
                  <Button variant="accent" size="xl" className="group gap-2">
                    Create Invoice
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  No credit card • No account required
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-4">
                Everything You Need
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A simple yet powerful tool designed for freelancers and small businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="form-section hover-lift animate-fade-up"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-medium text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="relative overflow-hidden rounded-2xl bg-primary p-8 md:p-12 lg:p-16">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent" />
              <div className="relative text-center">
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-primary-foreground mb-4">
                  Ready to Create Your First Invoice?
                </h2>
                <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                  Join thousands of freelancers and businesses who trust InvoSwift 
                  for their invoicing needs.
                </p>
                <Link to="/builder">
                  <Button 
                    variant="accent" 
                    size="lg" 
                    className="gap-2"
                  >
                    Get Started Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-6">
                About Us
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                InvoSwift is proudly backed by{" "}
                <span className="font-semibold text-foreground">Pixelnest</span>, 
                a leading web development company dedicated to building innovative digital solutions.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Founded by{" "}
                <span className="font-semibold text-foreground">Adnan Farooq</span>, 
                we are committed to simplifying invoicing for freelancers and small businesses worldwide.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
