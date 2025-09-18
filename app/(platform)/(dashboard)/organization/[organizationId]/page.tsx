import { create } from '@/actions/create-board';
import { Button } from '@/components/ui/button';
import { createClient, dbName } from '@/supabase/utils/server';
import { Board } from './board';
import { Form } from './form';

const OrganizationIdPage = async () => {
  const supabase = await createClient();
  const { data: boards } = await supabase.from(dbName).select();

  return (
    <div>
      <Form />
      <div className='space-y-2'>
        {boards?.map((board) => (
          <Board key={board.id} id={board.id} title={board.title} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationIdPage;
