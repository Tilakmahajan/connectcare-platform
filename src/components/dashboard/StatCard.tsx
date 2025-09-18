import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="card-medical-hover">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {title}
            </h3>
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">
              {value}
            </div>
            {(description || trendValue) && (
              <div className="flex items-center space-x-2 text-xs">
                {trendValue && (
                  <span className={`font-medium ${
                    trend === 'up' ? 'text-success' : 
                    trend === 'down' ? 'text-destructive' : 
                    'text-muted-foreground'
                  }`}>
                    {trend === 'up' && '+'}
                    {trendValue}
                  </span>
                )}
                {description && (
                  <span className="text-muted-foreground">
                    {description}
                  </span>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};