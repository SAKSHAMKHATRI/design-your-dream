
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I customize the number of rooms in my design?",
    answer: "Absolutely! Our AI allows you to specify the exact number of bedrooms, bathrooms, living areas, and any additional rooms you need. You can also customize room sizes and layouts to match your requirements."
  },
  {
    question: "Can I generate and download PDF blueprints?",
    answer: "Yes! Once your design is complete, you can instantly generate professional-quality PDF blueprints that include floor plans, 3D views, measurements, and specifications. These are perfect for contractors and permit applications."
  },
  {
    question: "How accurate are the cost estimations?",
    answer: "Our cost estimations are based on real-time market data, local construction rates, and material costs in your area. While estimates may vary by 10-15% depending on specific contractors and material choices, they provide an excellent baseline for budgeting."
  },
  {
    question: "What architectural styles are available?",
    answer: "We offer Modern, Traditional, Minimalist, and Luxury styles, each with multiple sub-variations. Our AI can also blend styles or create custom variations based on your specific preferences and requirements."
  },
  {
    question: "Can I modify the design after it's generated?",
    answer: "Yes! Our platform allows you to make adjustments to your design, including room layouts, exterior features, materials, and colors. You can iterate on your design until it perfectly matches your vision."
  },
  {
    question: "Is my design data secure and private?",
    answer: "Absolutely. All your design data is encrypted and stored securely. We never share your designs or personal information with third parties. You maintain full ownership of all designs you create."
  }
];

export const FAQ = () => {
  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked{" "}
            <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our AI-powered design platform
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-background"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
