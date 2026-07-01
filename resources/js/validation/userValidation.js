import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name must be 255 characters or less'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export function normalizeErrors(result) {
  if (result.success) {
    return { name: '', email: '', password: '' };
  }

  const formatted = result.error.format();

  return {
    name: formatted.name?._errors.join(' ') ?? '',
    email: formatted.email?._errors.join(' ') ?? '',
    password: formatted.password?._errors.join(' ') ?? '',
  };
}
