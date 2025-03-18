"use client";

interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({ type, placeholder, value, onChange, className }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 p-2 rounded ${className}`}
    />
  );
} 