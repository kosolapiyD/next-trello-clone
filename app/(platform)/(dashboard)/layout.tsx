import React from 'react';
import Navbar from './_components/navbar';
import { createClient } from '@/supabase/utils/server';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();
  const { data } = await supabase.from('trello-clone').select();

  console.log('data :>> ', data);

  return (
    <div className='h-full'>
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
