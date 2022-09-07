import React from "react";

const TableEditableRow = ({
  editTableData,
  handleEditChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          placeholder="Enter edited name"
          id="name"
          value={editTableData.name}
          onChange={handleEditChange}
        />
      </td>
      <td>
        <input
          type="email"
          placeholder="Enter edited email"
          id="email"
          value={editTableData.email}
          onChange={handleEditChange}
        />
      </td>
      <td>
        <input
          type="date"
          id="date"
          onChange={handleEditChange}
          value={editTableData.date}
        />
      </td>
      <td>
        <input
          type="time"
          id="time"
          onChange={handleEditChange}
          value={editTableData.time}
        />
      </td>
      <td>
        <button type="submit">Save</button>
        <button onClick={handleCancelClick}>Cancel</button>
      </td>
    </tr>
  );
};

export default TableEditableRow;
