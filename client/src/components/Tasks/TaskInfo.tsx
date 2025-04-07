export default function TaskInfo() {
  return (
    <div className='task'>
      <div className='task-info'>
        <div className='task-info-header'>
          <h1>Task Name</h1>
        </div>
        <div className='task-info-body'>
          <p>Description</p>
        </div>
        <div className='task-info-footer'>
          <p>Due Date</p>
        </div>
      </div>
      <div className='task-comments'>
        <h2>Comments</h2>
        <div className='task-comments-container'>
          <p>Comment 1</p>
          <p>Comment 2</p>
          <p>Comment 3</p>
        </div>
      </div>
    </div>
  );
}
