import * as React from "react";
import { cva, cx } from "class-variance-authority";

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
};