export const MODULE_TYPES = {
  METRICS: 'metrics',
  CHART: 'chart',
  TABLE: 'table',
  BREAKDOWN: 'breakdown'
};

export const initialModules = [
  {
    id: 1,
    name: "Revenue Metrics",
    type: MODULE_TYPES.METRICS,
    endpoint: "/api/metrics/revenue",
    refreshInterval: 300000, // 5 minutes
    config: {
      metrics: [
        { key: "total_revenue", label: "Total Revenue" },
        { key: "conversion_rate", label: "Conversion Rate" }
      ]
    }
  },
  {
    id: 2,
    name: "Sales Trend",
    type: MODULE_TYPES.CHART,
    endpoint: "/api/charts/sales",
    refreshInterval: 900000, // 15 minutes
    config: {
      chartType: "line",
      xAxis: "date",
      yAxis: "sales"
    }
  },
  {
    id: 3,
    name: "Regional Performance",
    type: MODULE_TYPES.BREAKDOWN,
    endpoint: "/api/breakdown/regional",
    refreshInterval: 3600000, // 1 hour
    config: {
      groupBy: "region",
      metrics: ["revenue", "orders"]
    }
  }
];