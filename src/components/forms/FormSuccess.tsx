"use client";

interface FormSuccessProps {
  message: string;
  className?: string;
}

export default function FormSuccess({ message, className }: FormSuccessProps) {
  return (
    <p className={`text-green-500 text-xs italic ${className}`}>
      {message}
    </p>
  );
} 