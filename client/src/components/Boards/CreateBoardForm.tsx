export default function CreateBoardForm() {
  return (
    <div className='create-board-form'>
      <h2>Create Board</h2>
      <form>
        <div className='board-name'>
          <label>Board Name</label>
          <input type='text' name='boardName' required />
        </div>

        <div className='board-type'>
          <label>Board Type</label>
          <div className='board-type-options'>
            <label>
              <input type='radio' name='boardType' value='kanban' checked />
              Kanban
            </label>
            <label>
              <input type='radio' name='boardType' value='scrum' />
              Scrum
            </label>
          </div>
        </div>

        <div className='board-description'>
          <label>Description</label>
          <textarea name='description'></textarea>
        </div>

        <div className='board-default-columns'>
          <label>Default Columns</label>
          <div className='board-default-column-options'>
            <label>
              <input type='checkbox' name='columns' value='To Do' checked />
              To Do
            </label>
            <label>
              <input
                type='checkbox'
                name='columns'
                value='In Progress'
                checked
              />
              In Progress
            </label>
            <label>
              <input type='checkbox' name='columns' value='Done' checked />
              Done
            </label>
          </div>
        </div>

        <div className='board-members'>
          <label>Invite Members</label>
          <input
            type='text'
            name='members'
            placeholder='Enter emails separated by commas'
          />
        </div>

        <div className='board-visibility'>
          <label>Visibility</label>
          <select className='board-visibility-options' name='visibility'>
            <option value='private'>Private</option>
            <option value='team'>Team</option>
            <option value='public'>Public</option>
          </select>
        </div>

        <div>
          <button type='submit'>Create Board</button>
        </div>
      </form>
    </div>
  );
}
