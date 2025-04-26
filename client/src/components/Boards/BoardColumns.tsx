import { BoardColumnProps } from '../../store';
import BoardColumn from './BoardColumn';

export default function BoardColumns({
  columns,
}: {
  columns: BoardColumnProps[];
}) {
  const renderColumns = () => {
    if (columns) {
      return columns.map((column) => (
        <BoardColumn key={column.id} {...column} />
      ));
    }
    return null;
  };

  return <div className='board-columns'>{renderColumns()}</div>;
}
