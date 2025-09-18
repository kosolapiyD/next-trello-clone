'use client';

import { create } from '@/actions/create-board';
import { Button } from '@/components/ui/button';

export const Form = () => {
  return (
    <form action={create} className='flex flex-col space-y-4'>
      <input
        id='title'
        name='title'
        required
        placeholder='Enter a board title'
        className='border-black border p-1'
      />
      <Button type='submit'>Create Board</Button>
    </form>
  );
};
