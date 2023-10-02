import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { ZodType } from "zod";

export function useZodForm <T extends FieldValues>(schema: ZodType) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<T>({ resolver: zodResolver(schema) });
  return {
    handleSubmit,
    register,
    errors,
    reset
  }
};