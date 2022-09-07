import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const TableRow = ({ appointment, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{appointment.name}</td>
      <td>{appointment.email}</td>
      <td>{appointment.date}</td>
      <td>{appointment.time}</td>
      <td>
        <button onClick={(e) => handleEditClick(e, appointment)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
      <td>
        <button onClick={(e) => handleDeleteClick(e, appointment._id)}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
