import { useState } from 'react';

export default function CreateBoardForm() {
  const defaultColumns = ['To Do', 'In Progress', 'Done'];
  const visibilityOptions = ['Team', 'Private'];

  const [visibile, setVisibile] = useState(true);

  const toggleVisibility = (option: string) => {
    if (option === 'Team') {
      setVisibile(true);
    } else {
      setVisibile(false);
    }
  };

  const renderVisibilityOptions = () => {
    return visibilityOptions.map((option: string) => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    });
  };

  const renderDefaultColumns = () => {
    return defaultColumns.map((column: string) => {
      return (
        <label className='board-default-column-option' key={column}>
          <input type='checkbox' name='columns' value={column} checked />
          {column}
        </label>
      );
    });
  };

  const renderTeamInvite = () => {
    return (
      <div className='board-members'>
        <label>Invite Members</label>
        <input
          type='text'
          name='members'
          placeholder='Enter emails separated by commas'
        />
      </div>
    );
  };

  return (
    <div className='create-board-form'>
      <h2>Create Board</h2>
      <form>
        <div className='board-name'>
          <label>Board Name</label>
          <input type='text' name='boardName' required />
        </div>
        <div className='board-description'>
          <label>Description</label>
          <textarea name='description'></textarea>
        </div>

        <div className='board-default-columns'>
          <label>Default Columns</label>
          <div className='board-default-column-options'>
            {renderDefaultColumns()}
          </div>
        </div>
        <div className='board-visibility'>
          <label>Visibility</label>
          <select
            onChange={(e) => toggleVisibility(e.target.value)}
            className='board-visibility-options'
            name='visibility'
          >
            {renderVisibilityOptions()}
          </select>
        </div>

        {visibile && renderTeamInvite()}
        <div>
          <button type='submit'>Create Board</button>
        </div>
      </form>
    </div>
  );
}
