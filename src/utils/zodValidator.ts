import { z, ZodType } from "zod";
import { LoginFormInterface, RegisterFormInterface } from "../interfaces/Auth";


export const registerSchema: ZodType<RegisterFormInterface> = z.object({
    user_name: z.string().min(4),
    user_full_name: z.string().min(4),
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



/**
 * path
 * |- Add Project
 * |--- Project Reference
 */
export const referenceSchema = z.object({
    title: z.string(),
    link: z.string().url()
})


export const projectSchema = z.object({
    project_name: z.string().trim().min(3),
    project_start_date: z.string(),
    project_end_date: z.string(),
    project_desc: z.string().trim().min(10)
}).refine(data => new Date(data.project_start_date) < new Date(data.project_end_date), {
    message: "End date can't be previous date of start date",
    path: ["endDate"]
})


/**
 * Team validation schema
 */
export const teamSchema = z.object({
    team_name: z.string().trim().min(4),
    team_desc: z.string().trim().min(10)
})