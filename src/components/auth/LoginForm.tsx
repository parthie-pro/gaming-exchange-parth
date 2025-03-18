"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { emailSchema, passwordSchema } from "@/lib/validations";
import FormField from "@/components/forms/FormField";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/Button";

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    // Handle login logic here
    console.log("Login data submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <FormField label="Email">
        <input type="email" {...register("email")} className="border border-gray-300 p-2 rounded w-full" />
        {errors.email && <FormError message={errors.email.message} />}
      </FormField>
      <FormField label="Password">
        <input type="password" {...register("password")} className="border border-gray-300 p-2 rounded w-full" />
        {errors.password && <FormError message={errors.password.message} />}
      </FormField>
      <Button type="submit" className="w-full mt-4">Login</Button>
    </form>
  );
} 