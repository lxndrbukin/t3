import "./assets/styles.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  BoardListItemProps,
  getBoardsList,
} from "../../store";

import Popup from "../../assets/reusable/Popup";
import CreateBoardForm from "./CreateBoardForm";
import BoardsGridItem from "./BoardsGridItem";

export default function BoardsGrid() {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: RootState) => state.boards);
  const { user } = useSelector((state: RootState) => state.session);

  useEffect(() => {
    if (user) {
      dispatch(getBoardsList(user.userId));
    }
  }, [dispatch, user]);

  const [showCreateBoard, setShowCreateBoard] = useState<boolean>(false);

  const renderCreateBoard = () => {
    return (
      <button
        onClick={() => setShowCreateBoard(true)}
        className="create-board-button"
      >
        Create Board
      </button>
    );
  };

  const renderBoards = () => {
    if (list.length === 0) {
      return renderCreateBoard();
    }
    return (
      <>
        {renderCreateBoard()}
        <div className="boards-grid">
          {list.map((board: BoardListItemProps) => {
            return <BoardsGridItem {...board} />;
          })}
        </div>
      </>
    );
  };

  return (
    <div className="boards-grid-container">
      {renderBoards()}
      {showCreateBoard && (
        <Popup setIsVisible={setShowCreateBoard}>
          <CreateBoardForm setIsVisible={setShowCreateBoard} />
        </Popup>
      )}
    </div>
  );
}
