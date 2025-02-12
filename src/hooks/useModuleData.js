import { useState, useEffect } from 'react';

// Mock data for different module types
const mockData = {
  '/api/metrics/revenue': {
    total_revenue: '$125,000',
    conversion_rate: '5.2%'
  },
  '/api/charts/sales': {
    data: [
      { date: '2024-01', sales: 1200 },
      { date: '2024-02', sales: 1500 }
    ]
  },
  '/api/breakdown/regional': {
    'North America': '$50,000',
    'Europe': '$45,000',
    'Asia': '$30,000'
  }
};

const useModuleData = (moduleConfig) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 500)); // Fake loading delay
        const mockResponse = mockData[moduleConfig.endpoint];
        
        if (!mockResponse) {
          throw new Error('No mock data available for this endpoint');
        }
        
        setData(mockResponse);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    if (moduleConfig.refreshInterval) {
      const interval = setInterval(fetchData, moduleConfig.refreshInterval);
      return () => clearInterval(interval);
    }
  }, [moduleConfig.endpoint, moduleConfig.refreshInterval]);

  return { data, loading, error };
};

export default useModuleData;