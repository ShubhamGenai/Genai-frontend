import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

 const data = [
  { name: 'Mon', value: 42 },
  { name: 'Tue', value: 53 },
  { name: 'Wed', value: 86 },
  { name: 'Thu', value: 72 },
  { name: 'Fri', value: 80 },
  { name: 'Sat', value: 55 },
  { name: 'Sun', value: 35 }
];

export const Chart = ({ type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {type === 'line' ? (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      ) : (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
};