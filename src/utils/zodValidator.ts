import { z, ZodType } from "zod";
import { LoginFormInterface, RegisterFormInterface } from "../interfaces/Auth";


export const registerSchema: ZodType<RegisterFormInterface> = z.object({
    user_name: z.string().min(4),
    user_email: z.string().email(),
    password: z.string().min(6),
    confirm_password: z.string()
}).refine(data => data.password === data.confirm_password, {
    message: "Password not match",
    path: ["confirm_password"]
})


export const loginSchema: ZodType<LoginFormInterface> = z.object({
    user_email: z.string().email(),
    password: z.string()
})