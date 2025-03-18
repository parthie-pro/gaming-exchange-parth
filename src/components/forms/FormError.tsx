"use client";

interface FormErrorProps {
  message: string;
  className?: string;
}

export default function FormError({ message, className }: FormErrorProps) {
  return (
    <p className={`text-red-500 text-xs italic ${className}`}>
      {message}
    </p>
  );
} 