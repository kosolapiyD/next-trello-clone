'use server';

import { createClient, dbName } from '@/supabase/utils/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CreateBoardSchema = z.object({
  title: z.string().min(1).max(255),
});

export async function create(formData: FormData) {
  const { title } = CreateBoardSchema.parse({
    title: formData.get('title'),
  });

  const supabase = createClient();
  const { data, error } = await (
    await supabase
  )
    .from(dbName)
    .insert({
      title,
    })
    .select()
    .single();

  revalidatePath('/organization/[organizationId]');
}
