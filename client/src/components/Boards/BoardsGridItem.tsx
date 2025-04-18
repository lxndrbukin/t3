import { BoardsGridItemProps } from './types';

export default function BoardsGridItem({
  id,
  name,
  description,
  createdAt,
}: BoardsGridItemProps) {
  return (
    <div className='boards-grid-item'>
      <div className='boards-grid-item-header'>
        <h3>{name}</h3>
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
