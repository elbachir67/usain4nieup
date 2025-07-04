import React from "react";
import { Goal } from "../types";
import {
  BookOpen,
  Clock,
  BarChart,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface GoalCardProps {
  goal: Goal;
  className?: string;
  isRecommended?: boolean;
}

const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  className = "",
  isRecommended = false,
}) => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/20 text-green-400";
      case "intermediate":
        return "bg-blue-500/20 text-blue-400";
      case "advanced":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ml":
        return "Machine Learning";
      case "dl":
        return "Deep Learning";
      case "data_science":
        return "Data Science";
      case "mlops":
        return "MLOps";
      case "computer_vision":
        return "Computer Vision";
      case "nlp":
        return "NLP";
      default:
        return category;
    }
  };

  const handleClick = () => {
    // Vérifier que l'ID existe avant la navigation
    if (goal._id) {
      navigate(`/goals/${goal._id}`);
    } else {
      console.error("Goal ID is undefined:", goal);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`glass-card rounded-xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {isRecommended && (
        <div className="absolute -top-2 -right-2 bg-yellow-500/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-lg">
          <Sparkles className="w-4 h-4 mr-1" />
          Recommandé
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-100 pr-20">{goal.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
            goal.level
          )}`}
        >
          {goal.level === "beginner"
            ? "Débutant"
            : goal.level === "intermediate"
            ? "Intermédiaire"
            : "Avancé"}
        </span>
      </div>

      <p className="text-gray-400 mb-6 line-clamp-2">{goal.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{goal.estimatedDuration} sem.</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{goal.modules?.length || 0} modules</span>
          </div>
        </div>

        <div className="flex items-center text-purple-400 group">
          <span className="text-sm">Détails</span>
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50"></div>
    </motion.div>
  );
};

export default GoalCard;
