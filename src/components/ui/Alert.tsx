"use client";

interface AlertProps {
  message: string;
  type: "success" | "error" | "info";
  className?: string;
}

export default function Alert({ message, type, className }: AlertProps) {
  const baseStyle = "p-4 rounded text-white";
  const typeStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div className={`${baseStyle} ${typeStyles[type]} ${className}`}>
      {message}
    </div>
  );
} 