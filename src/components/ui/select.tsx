import React, { useState } from 'react';

export interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === SelectTrigger) {
          return React.cloneElement(child as React.ReactElement<any>, {
            onClick: () => setIsOpen(!isOpen),
          });
        }
        return child;
      })}
      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === SelectContent) {
              return React.cloneElement(child as React.ReactElement<any>, {
                onValueChange: (newValue: string) => {
                  onValueChange(newValue);
                  setIsOpen(false);
                },
              });
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export const SelectTrigger: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({
  children,
  className = '',
  onClick,
}) => (
  <button className={`flex items-center justify-between rounded-md border p-2 ${className}`} onClick={onClick}>
    {children}
  </button>
);

export const SelectValue: React.FC<{ children: React.ReactNode }> = ({ children }) => <span>{children}</span>;

export const SelectContent: React.FC<{ children: React.ReactNode; onValueChange?: (value: string) => void }> = ({
  children,
  onValueChange,
}) => (
  <div className="py-1">
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === SelectItem && onValueChange) {
        return React.cloneElement(child as React.ReactElement<any>, {
          onSelect: () => onValueChange(child.props.value),
        });
      }
      return child;
    })}
  </div>
);

export const SelectItem: React.FC<{ value: string; children: React.ReactNode; onSelect?: () => void }> = ({
  value,
  children,
  onSelect,
}) => (
  <div className="px-2 py-1 cursor-pointer hover:bg-gray-100" onClick={onSelect}>
    {children}
  </div>
);