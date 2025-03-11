import { FormEvent, useState } from 'react';

export default function CreateTask() {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    dueDate: Date;
  }>({
    title: '',
    description: '',
    dueDate: new Date(),
  });
  const [date, setDate] = useState<Date | Date[]>(new Date());

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) setDate(newDate);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='create-task'>
      <h1>Create Task</h1>
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
        <button type='submit'>Create</button>
      </form>
    </div>
  );
}
