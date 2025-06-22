
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTA = () => {
  const navigate = useNavigate();

  const handleStartDesigning = () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    navigate('/design');
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-purple-600 text-primary-foreground relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl"
        animate={{
          scale: [1.5, 1, 1.5],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            className="inline-flex items-center bg-white/20 rounded-full px-6 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Ready to build your future?</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Transform Your Vision Into Reality
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join thousands of architects and designers who are already creating stunning spaces with AI
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-10 py-6 bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300"
              onClick={handleStartDesigning}
            >
              Start Designing Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 border-white text-white hover:bg-white hover:text-primary hover:scale-105 transition-all duration-300"
            >
              Explore Examples
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
