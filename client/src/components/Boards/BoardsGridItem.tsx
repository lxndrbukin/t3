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
      <div className="boards-grid-item-cover"></div>
      <div className="boards-grid-item-info">
        <div className="boards-grid-item-logo"></div>
        <div className="boards-grid-item-title">
          <h3>{boardName}</h3>
        </div>
        <div className="boards-grid-item-body">
          <p>{description}</p>
        </div>
        <div className="boards-grid-item-footer">
          <p>{key}</p>
        </div>
      </div>
    </Link>
  );
}
