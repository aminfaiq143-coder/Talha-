import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
  id?: string;
}

export function ToolCard({ title, description, icon: Icon, children, id }: ToolCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-6 neon-glow neon-border flex flex-col gap-4"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-cyan-500/10 rounded-lg">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-white">{title}</h3>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
      </div>
      <div className="mt-2">
        {children}
      </div>
    </motion.div>
  );
}
