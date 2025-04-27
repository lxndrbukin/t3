export default function CreateBoardTaskForm() {
  return (
    <div className='create-board-task-form'>
      <h2>Create Task</h2>
      <form>
        <div className='form-select'>
          <label htmlFor='board'>Board</label>
          <select name='board' id='board'>
            <option value='Board 1'>Board 1</option>
            <option value='Board 2'>Board 2</option>
            <option value='Board 3'>Board 3</option>
          </select>
        </div>
        <div className='form-select'>
          <label htmlFor='type'>Type</label>
          <select name='type' id='type'>
            <option value='To Do'>To Do</option>
            <option value='In Progress'>In Progress</option>
            <option value='Done'>Done</option>
          </select>
        </div>
        <div className='form-input'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            placeholder='Short summary'
            id='title'
            name='title'
          />
        </div>
        <div className='form-textarea'>
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            id='description'
            cols={30}
            rows={10}
            placeholder='Describe the task'
          ></textarea>
        </div>
        <button type='submit'>Create Task</button>
      </form>
    </div>
  );
}
