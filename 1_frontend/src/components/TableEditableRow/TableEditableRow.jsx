import React from "react";

const TableEditableRow = ({ editTableData, action }) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          placeholder="Enter edited name"
          id="name"
          value={editTableData.name}
          onChange={action}
        />
      </td>
      <td>
        <input
          type="email"
          placeholder="Enter edited email"
          id="email"
          value={editTableData.email}
          onChange={action}
        />
      </td>
      <td>
        <input
          type="date"
          id="date"
          onChange={action}
          value={editTableData.date}
        />
        {/* <input
          type="time"
          id="time"
          onChange={action}
          value={editTableData.time}
        /> */}
      </td>
      <td>
        <button type="submit">Save</button>
      </td>
    </tr>
  );
};

export default TableEditableRow;
