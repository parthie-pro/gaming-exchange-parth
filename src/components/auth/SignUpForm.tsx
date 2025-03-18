"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { emailSchema, passwordSchema, usernameSchema } from "@/lib/validations";
import FormField from "@/components/forms/FormField";
import FormError from "@/components/forms/FormError";
import FormSuccess from "@/components/forms/FormSuccess";
import { Button } from "@/components/ui/Button";

const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    // Simulate a successful sign-up
    setSuccessMessage("Sign-up successful!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {successMessage && <FormSuccess message={successMessage} />}
      <FormField label="Email">
        <input type="email" {...register("email")} className="border border-gray-300 p-2 rounded w-full" />
        {errors.email && <FormError message={errors.email.message} />}
      </FormField>
      <FormField label="Username">
        <input type="text" {...register("username")} className="border border-gray-300 p-2 rounded w-full" />
        {errors.username && <FormError message={errors.username.message} />}
      </FormField>
      <FormField label="Password">
        <input type="password" {...register("password")} className="border border-gray-300 p-2 rounded w-full" />
        {errors.password && <FormError message={errors.password.message} />}
      </FormField>
      <Button type="submit" className="w-full mt-4">Sign Up</Button>
    </form>
  );
} 