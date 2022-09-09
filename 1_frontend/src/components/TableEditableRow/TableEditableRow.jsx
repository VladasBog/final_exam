import { forwardRef } from "react";
import { StyledTableRow } from "./TableEditableRow.style";

const TableEditableRow = (
  { editTableData, handleEditChange, handleCancelClick },
  ref
) => {
  // Refs test
  const { nameRef, emailRef, dateRef, timeRef } = ref;

  return (
    <StyledTableRow>
      <td>
        <input
          type="text"
          id="name"
          value={editTableData.name}
          onChange={handleEditChange}
          ref={nameRef}
        />
      </td>
      <td>
        <input
          type="email"
          id="email"
          value={editTableData.email}
          onChange={handleEditChange}
          ref={emailRef}
        />
      </td>
      <td>
        <input
          type="date"
          id="date"
          onChange={handleEditChange}
          value={editTableData.date}
          ref={dateRef}
        />
      </td>
      <td>
        <input
          type="time"
          id="time"
          onChange={handleEditChange}
          value={editTableData.time}
          ref={timeRef}
        />
      </td>
      <td>
        <button type="submit">Save</button>
        <button onClick={handleCancelClick}>Cancel</button>
      </td>
    </StyledTableRow>
  );
};

export default forwardRef(TableEditableRow);
