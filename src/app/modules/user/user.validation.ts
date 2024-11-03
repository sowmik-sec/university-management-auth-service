import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First Name is required' }),
        middleName: z.string().optional(),
        lastName: z
          .string({ required_error: 'Last Name is required' })
          .optional(),
      }),
      dateOfBirth: z.string({ required_error: 'Date of birth is required' }),
      gender: z.enum(['male', 'female'], {
        required_error: 'gender is required',
      }),
      bloodGroup: z.enum(['male', 'female'], {
        required_error: 'blood group is required',
      }),
    }),
  }),
})
// await createUserZodSchema.parseAsync(req)

export const UserValidation = {
  createUserZodSchema,
}
