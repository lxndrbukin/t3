import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, createTaskCategory } from '../../store';

import { CreateCategoryProps } from './types';

export default function CreateCategory({ setIsVisible }: CreateCategoryProps) {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: any) => state.session);
  const [category, setCategory] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createTaskCategory({
        userId: (user as any).googleId,
        data: { category },
      })
    );
    setIsVisible(false);
  };

  return (
    <div className='create'>
      <h1>New Category</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={category}
          onChange={handleChange}
          placeholder='Category Name'
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
