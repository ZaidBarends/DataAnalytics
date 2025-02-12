import React from 'react';

const JsonDisplay = ({ data }) => {
  const formatValue = (value) => {
    if (typeof value === 'number') {
      return <span className="text-cyan-300">{value}</span>;
    }
    if (typeof value === 'string') {
      return <span className="text-green-300">"{value}"</span>;
    }
    if (typeof value === 'boolean') {
      return <span className="text-yellow-300">{value.toString()}</span>;
    }
    if (value === null) {
      return <span className="text-gray-400">null</span>;
    }
    return value;
  };

  const renderJson = (obj, depth = 0) => {
    const indent = '  '.repeat(depth);
    
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      return (
        <div>
          <span>[</span>
          <div style={{ marginLeft: 20 }}>
            {obj.map((item, index) => (
              <div key={index}>
                {indent}
                {typeof item === 'object' && item !== null 
                  ? renderJson(item, depth + 1)
                  : formatValue(item)}
                {index < obj.length - 1 ? ',' : ''}
              </div>
            ))}
          </div>
          {indent}]
        </div>
      );
    }

    if (typeof obj === 'object' && obj !== null) {
      const entries = Object.entries(obj);
      if (entries.length === 0) return '{}';
      return (
        <div>
          <span>{'{'}</span>
          <div style={{ marginLeft: 20 }}>
            {entries.map(([key, value], index) => (
              <div key={key}>
                {indent}
                <span className="text-purple-300">"{key}"</span>: {' '}
                {typeof value === 'object' && value !== null 
                  ? renderJson(value, depth + 1)
                  : formatValue(value)}
                {index < entries.length - 1 ? ',' : ''}
              </div>
            ))}
          </div>
          {indent}{'}'}
        </div>
      );
    }

    return formatValue(obj);
  };

  return (
    <div className="font-mono text-sm whitespace-pre overflow-auto p-4 rounded bg-gray-800 text-white">
      {renderJson(data)}
    </div>
  );
};

export default JsonDisplay;