import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});


export const BudgetValidationSchema = z.object({
  budgetCategory: z.string().min(2, { message: 'Category cannot be empty' }),
  maxSpend: z.string()
    .min(1, { message: 'Please enter a valid amount' })
    .regex(/^\d+(\.\d{1,2})?$/, { message: 'Only numbers are allowed (e.g., 100 or 99.99)' }), // Allows whole numbers and decimals
  colorPref: z.string().min(2, { message: 'Please select a color' }),
});


export const PotValidationSchema = z.object({
  potName: z.string().min(2, { message: 'Pot name cannot be empty' }),
  target: z.string().min(1, { message: 'Please enter a valid amount' }),
  colorPref: z.string().min(2, { message: 'Please select a color' }),
});

export const AddMoneyValidationSchema = z.object({
  addedAmount: z.number().min(1, { message: 'Please enter a valid amount' }).transform((val) => Number(val) || 0),
});

export const WithdrawMoneyValidationSchema = z.object({
  withdrawnAmount: z.number().min(1, { message: 'Please enter a valid amount' }).transform((val) => Number(val) || 0),
})