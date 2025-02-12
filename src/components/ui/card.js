import * as React from "react";
import { cva, cx } from "class-variance-authority";
import { MODULE_TYPES } from '../../utils/moduleConfig';
import useModuleData from '../../hooks/useModuleData';

const cardVariants = cva(
  "rounded-lg border text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-gray-700 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Card = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cx(cardVariants({ variant }), className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cx("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cx("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cx("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cx("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cx("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

const KeyMetrics = ({ metrics }) => (
  <div className="p-4 flex-1 min-w-[200px] text-white">
    <h4 className="text-md font-semibold">Key Metrics</h4>
    <ul>
      {metrics.map((metric, index) => (
        <li key={index}>{metric}</li>
      ))}
    </ul>
  </div>
);

const TimePeriodSelector = ({ periods, onSelect }) => (
  <div className="p-4 flex-1 min-w-[200px] text-white">
    <h4 className="text-md font-semibold">Time Period</h4>
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="bg-gray-700 text-white p-2 rounded w-full border border-gray-600"
    >
      {periods.map((period, index) => (
        <option key={index} value={period} className="bg-gray-700 text-white">
          {period}
        </option>
      ))}
    </select>
  </div>
);

const DataBreakdown = ({ breakdowns }) => (
  <div className="p-4 flex-1 min-w-[200px] text-white">
    <h4 className="text-md font-semibold">Data Breakdown</h4>
    <ul>
      {breakdowns.map((breakdown, index) => (
        <li key={index}>{breakdown}</li>
      ))}
    </ul>
  </div>
);

const ModuleContent = ({ module }) => {
  const { data, loading, error } = useModuleData(module);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-400">
        <p>Error: {error}</p>
      </div>
    );
  }

  switch (module.type) {
    case MODULE_TYPES.METRICS:
      return (
        <KeyMetrics 
          metrics={module.config.metrics.map(metric => 
            `${metric.label}: ${data?.[metric.key] || 'N/A'}`
          )} 
        />
      );
    
    case MODULE_TYPES.CHART:
      return (
        <div className="w-full h-full min-h-[200px] text-white p-4">
          <h4 className="text-md font-semibold mb-2">Sales Data</h4>
          <ul className="space-y-2">
            {data?.data?.map((item, index) => (
              <li key={index}>
                {item.date}: {item.sales} sales
              </li>
            )) || 'No data available'}
          </ul>
        </div>
      );
    
    case MODULE_TYPES.BREAKDOWN:
      return (
        <DataBreakdown 
          breakdowns={Object.entries(data || {}).map(([key, value]) => 
            `${key}: ${value}`
          )} 
        />
      );
    
    default:
      return null;
  }
};

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  KeyMetrics,
  TimePeriodSelector,
  DataBreakdown,
  ModuleContent,
};