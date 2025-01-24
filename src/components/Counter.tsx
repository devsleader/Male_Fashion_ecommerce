

// components/Counter.tsx
'use client'
import { count } from 'console';
import { useState, useEffect } from 'react';

interface CounterItemProps {
  number: number;
  label: string;
  duration?: number;
  suffix?: string;
}

const CounterItem = ({ number, label, duration = 2000, suffix = '' }: CounterItemProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const step = Math.ceil(number / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current > number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [number, duration]);

  return (
    <div className="mb-8 md:mb-0">
      <div className="flex items-baseline mb-2">
        <h2 className="text-5xl font-bold text-gray-900">{count}</h2>
        {suffix && <strong className="text-3xl font-bold text-gray-900 ml-1">{suffix}</strong>}
      </div>
      <span className="text-lg font-bold text-gray-600" dangerouslySetInnerHTML={{ __html: label.replace('<br />', '<br>') }} />
    </div>
  );
};

const Counter = () => {
  const counters = [
    { number: 102, label: 'Our Clients' },
    { number: 30, label: 'Total Categories' },
    { number: 102, label: 'In Country' },
    { number: 98, label: 'Happy Customer', suffix: '%' }
  ];

  return (
    <section className="py-20 border-b border-gray-200">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {counters.map((counter, index) => (
            <CounterItem 
              key={index}
              number={counter.number}
              label={counter.label}
              suffix={counter.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Counter;