
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";

interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  index: number;
}

export const CategoryCard = ({ id, title, description, icon, gradient, index }: CategoryCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    navigate(`/design?category=${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="h-full"
    >
      <Card 
        className="cursor-pointer h-full border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-xl group"
        onClick={handleClick}
      >
        <CardHeader className="text-center pb-4">
          <motion.div
            className={`mx-auto p-6 rounded-2xl bg-gradient-to-r ${gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
            whileHover={{ rotate: 5 }}
          >
            {icon}
          </motion.div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
