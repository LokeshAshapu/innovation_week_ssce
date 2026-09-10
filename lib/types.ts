import { z } from 'zod'

export const BRANCHES = [
  'CSE',
  'AIML',
  'ECE',
  'EEE',
  'MECH',
  'CIVIL',
  'Diploma',
] as const

export const YEARS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
] as const

export const ROLES = [
  'STUDENT',
  'COORDINATOR',
  'FACULTY',
  'EVALUATOR',
  'ADMIN',
] as const

export const TeamMemberSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  rollNumber: z.string().min(3, 'Roll number is required'),
  branch: z.enum(BRANCHES),
  diplomaBranch: z.string().optional(),
  year: z.enum(YEARS),
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  phone: z.string().min(10, '10-digit phone required').optional().or(z.literal('')),
}).refine((data) => {
  if (data.branch === 'Diploma') {
    return !!data.diplomaBranch && data.diplomaBranch.trim().length > 0
  }
  return true
}, {
  message: 'Please specify your Diploma Branch (e.g. Diploma Mechanical, Diploma ECE)',
  path: ['diplomaBranch'],
})

export const TeamRegistrationSchema = z.object({
  teamName: z.string().min(3, 'Team name must be at least 3 characters'),
  leader: TeamMemberSchema,
  member2: TeamMemberSchema,
  member3: TeamMemberSchema,
  member4: TeamMemberSchema,
  member5: TeamMemberSchema.optional(),
})

export type TeamRegistrationInput = z.infer<typeof TeamRegistrationSchema>

export interface SessionUser {
  id: string
  name: string
  email: string
  role: 'STUDENT' | 'COORDINATOR' | 'FACULTY' | 'EVALUATOR' | 'ADMIN'
  teamId?: string | null
}
