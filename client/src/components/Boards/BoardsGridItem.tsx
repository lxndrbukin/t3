import { BoardListItemProps } from "../../store";
import { Link } from "react-router-dom";

export default function BoardsGridItem({
  id,
  boardName,
  description,
  key,
}: BoardListItemProps) {
  return (
    <Link to={`/boards/${id}`} className="boards-grid-item">
      <div className="boards-grid-item-header">
        <h3>{boardName}</h3>
      </div>
      <div className="boards-grid-item-body">
        <p>{description}</p>
      </div>
      <div className="boards-grid-item-footer">
        <p>{key}</p>
      </div>
    </Link>
  );
}
