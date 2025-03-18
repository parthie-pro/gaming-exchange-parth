"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { emailSchema, passwordSchema } from "@/lib/validations/index";
import FormField from "@/components/forms/FormField";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setErrorMessage("Login failed. Please check your credentials.");
      } else {
        setErrorMessage("");
        // Redirect to a protected page or home page
        window.location.href = "/";
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {errorMessage && <FormError message={errorMessage || ""} />}
      <FormField label="Email">
        <input type="email" {...register("email")} className="border border-gray-300 p-2 rounded w-full" />
        {errors.email && <FormError message={errors.email.message || ""} />}
      </FormField>
      <FormField label="Password">
        <input type="password" {...register("password")} className="border border-gray-300 p-2 rounded w-full" />
        {errors.password && <FormError message={errors.password.message || ""} />}
      </FormField>
      <Button type="submit" className="w-full mt-4">Login</Button>
    </form>
  );
} 