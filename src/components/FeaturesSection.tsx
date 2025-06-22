
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Box, Calculator, FileDown } from "lucide-react";

const features = [
  {
    icon: <Brain className="h-10 w-10" />,
    title: "AI-Powered Floor Planning",
    description: "Advanced artificial intelligence creates optimized floor plans tailored to your specific needs and preferences.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Box className="h-10 w-10" />,
    title: "3D Preview of Building",
    description: "Visualize your design in stunning 3D with photorealistic rendering and interactive exploration.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: <Calculator className="h-10 w-10" />,
    title: "Cost Estimation with Location",
    description: "Get accurate cost estimates based on your location, materials, and local construction rates.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: <FileDown className="h-10 w-10" />,
    title: "Easy Export to PDF",
    description: "Download professional blueprints and documentation in high-quality PDF format instantly.",
    gradient: "from-orange-500 to-red-500"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Powerful Features for{" "}
            <span className="text-primary">Modern Design</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our cutting-edge AI technology transforms your architectural vision into reality with precision and speed
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="h-full"
            >
              <Card className="h-full border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-xl group">
                <CardHeader className="text-center">
                  <motion.div
                    className={`mx-auto p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
