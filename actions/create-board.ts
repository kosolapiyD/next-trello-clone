'use server';

import { createClient, dbName } from '@/supabase/utils/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

type State = {
  errors?: {
    title?: string[] | undefined;
  };
  message?: string | null;
};

const CreateBoardSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' }),
});

export async function create(prevState: State, formData: FormData) {
  const validatedFields = CreateBoardSchema.safeParse({
    title: formData.get('title'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields',
    };
  }

  const { title } = validatedFields.data;

  try {
    const supabase = createClient();
    await (
      await supabase
    )
      .from(dbName)
      .insert({
        title,
      })
      .select()
      .single();
  } catch (error) {
    return {
      message: 'Create board database error',
    };
  }

  revalidatePath('/organization/[organizationId]');
  // TODO replace with actual dynamic organization id
  redirect('/organization/org_2zBLXsyxKug31JpMV4cCqquQrHG');
}
