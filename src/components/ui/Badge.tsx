"use client";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span className={`bg-green-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${className}`}>
      {children}
    </span>
  );
} 