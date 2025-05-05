import { FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch, createBoard } from "../../store";

type CreateBoardFormProps = {
  setIsVisible: (isVisible: boolean) => void;
};

export default function CreateBoardForm({
  setIsVisible,
}: CreateBoardFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [customColumn, setCustomColumn] = useState<string>("");
  const [customColumns, setCustomColumns] = useState<string[]>([]);
  const [visibile, setVisibile] = useState(true);
  const visibilityOptions = ["Team", "Private"];

  const { user } = useSelector((state: RootState) => state.session);
  const { isLoading } = useSelector((state: RootState) => state.boards);

  const toggleVisibility = (option: string) => {
    if (option === "Team") {
      setVisibile(true);
    } else {
      setVisibile(false);
    }
  };

  const addCustomColumn = () => {
    if (customColumn) {
      setCustomColumns([...customColumns, customColumn]);
      setCustomColumn("");
    }
    return;
  };

  const removeCustomColumn = (column: string) => {
    setCustomColumns(customColumns.filter((c) => c !== column));
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

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const board = await dispatch(
        createBoard({
          userId: user!.userId,
          data: {
            boardName: e.currentTarget.boardName.value,
            description: e.currentTarget.description.value,
            key: e.currentTarget.key.value,
            columns: customColumns,
            visibility: e.currentTarget.visibility.value,
          },
        })
      ).unwrap();
      setIsVisible(false);
      console.log(board);
      navigate(`/boards/${board.id}`);
    } catch (error) {
      console.error("Failed to create board:", error);
    }
  };

  const renderCustomColumnsList = () => {
    return customColumns.map((column: string) => {
      return (
        <li className="custom-column" key={column}>
          <span>{column}</span>
          <i
            onClick={() => removeCustomColumn(column)}
            className="fa-solid fa-xmark"
          ></i>
        </li>
      );
    });
  };

  const renderTeamInvite = () => {
    return (
      <div className="board-members">
        <label>Invite Members</label>
        <input
          type="text"
          name="members"
          placeholder="Enter emails separated by commas"
        />
      </div>
    );
  };

  const renderSubmitButton = () => {
    return (
      <button disabled={isLoading} type="submit">
        {isLoading ? (
          <i className="fa-solid fa-circle-notch"></i>
        ) : (
          "Create Board"
        )}
      </button>
    );
  };

  return (
    <div className="create-board-form">
      <h2>Create Board</h2>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div className="board-name">
          <label>Board Name</label>
          <input placeholder="Ex: My New Board" type="text" name="boardName" />
        </div>
        <div className="board-key">
          <label>Board Key</label>
          <input placeholder="Ex: PROJ" type="text" name="key" />
        </div>
        <div className="board-description">
          <label>Description</label>
          <textarea
            placeholder="Describe your board"
            name="description"
          ></textarea>
        </div>
        <div className="board-custom-columns">
          <label>Board Columns</label>
          <div className="custom-columns-input">
            <input
              type="text"
              value={customColumn}
              placeholder="Enter column name"
              onChange={(e) => setCustomColumn(e.target.value)}
              name="columnsInput"
            />
            <button type="button" onClick={addCustomColumn}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <ul className="custom-columns-list">{renderCustomColumnsList()}</ul>
        </div>
        <div className="board-visibility">
          <label>Visibility</label>
          <select
            onChange={(e) => toggleVisibility(e.target.value)}
            className="board-visibility-options"
            name="visibility"
          >
            {renderVisibilityOptions()}
          </select>
        </div>
        {visibile && renderTeamInvite()}
        <div className="buttons">
          {renderSubmitButton()}
          <button onClick={() => setIsVisible(false)} type="button">
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
