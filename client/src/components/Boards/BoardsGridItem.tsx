import { BoardListItemProps } from '../../store';

export default function BoardsGridItem({
  id,
  boardName,
  description,
  createdAt,
}: BoardListItemProps) {
  return (
    <div className='boards-grid-item'>
      <div className='boards-grid-item-header'>
        <h3>{boardName}</h3>
      </div>
      <div className='boards-grid-item-body'>
        <p>{description}</p>
      </div>
      <div className='boards-grid-item-footer'>
        <p>{createdAt && new Date(createdAt).toDateString()}</p>
      </div>
    </div>
  );
}
