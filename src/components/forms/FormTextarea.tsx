"use client";

interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export default function FormTextarea({ label, value, onChange, className }: FormTextareaProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        className="border border-gray-300 p-2 rounded w-full"
        rows={4}
      />
    </div>
  );
} 