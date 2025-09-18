import { deleteBoard } from '@/actions/delete-board';
import { FormDeleteButton } from './form-delete-button';

interface BoardProps {
  id: string;
  title: string;
}

export const Board = ({ id, title }: BoardProps) => {
  // Bind the board ID to the action
  const deleteBoardById = deleteBoard.bind(null, id);

  return (
    <form
      className='flex items-center gap-x-2'
      method='post'
      action={deleteBoardById}
    >
      <p>Board title: {title}</p>
      <FormDeleteButton />
    </form>
  );
};
