'use client';

import { create } from '@/actions/create-board';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { FormInput } from './form-input';

export const Form = () => {
  const initialState = { message: '', errors: { title: undefined } };
  const [state, dispatch] = useFormState(create, initialState);

  console.log('state :>> ', state);

  return (
    <form action={dispatch} className='flex flex-col space-y-4'>
      <FormInput errors={state?.errors} />
      <Button type='submit'>Create Board</Button>
    </form>
  );
};
