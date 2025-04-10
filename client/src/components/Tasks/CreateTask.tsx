import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, createTask } from '../../store';

import { CreateTaskProps } from './types';

export default function CreateTask({ setIsVisible }: CreateTaskProps) {
  const { user } = useSelector((state: RootState) => state.session);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    dueDate: Date;
  }>({
    title: '',
    description: '',
    dueDate: new Date(),
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createTask({ userId: (user as any).googleId, data: formData }));
    setIsVisible(false);
  };

  return (
    <div className='create'>
      <h1>New Task</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          type='text'
          name='title'
          placeholder='Title'
        />
        <textarea
          onChange={handleInputChange}
          name='description'
          placeholder='Description'
        />
        <input type='date' name='dueDate' onChange={handleInputChange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
