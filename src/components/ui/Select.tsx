"use client";

interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export default function Select({ options, value, onChange, className }: SelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`border border-gray-300 p-2 rounded ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
} 