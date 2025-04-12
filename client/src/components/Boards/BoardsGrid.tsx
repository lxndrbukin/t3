export default function BoardsGrid() {
  const boards: Array<any> = [];

  const renderCreateBoard = () => {
    return <button className='create-board-button'>Create Board</button>;
  };

  const renderBoards = () => {
    if (boards.length === 0) {
      return renderCreateBoard();
    }
    return (
      <div className='boards-grid'>
        {boards.map((board) => {
          return (
            <div className='board-container' key={board.id}>
              <div className='board'>{board.name}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className='boards-grid-container'>
      <h1>Boards</h1>
      {renderBoards()}
    </div>
  );
}
