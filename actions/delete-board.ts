'use server';

import { createClient, dbName } from '@/supabase/utils/server';
import { revalidatePath } from 'next/cache';

export const deleteBoard = async (boardId: string) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from(dbName)
    .delete()
    .eq('id', boardId);

  if (error) {
    console.error('Error deleting board:', error);
  }

  revalidatePath('/organization/[organizationId]');
};
