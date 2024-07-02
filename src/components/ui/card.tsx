import React from 'react';

export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = '', children }) => {
  return <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>;
};

export const CardContent: React.FC<CardProps> = ({ className = '', children }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};