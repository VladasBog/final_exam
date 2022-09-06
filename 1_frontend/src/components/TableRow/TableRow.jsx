import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const TableRow = ({ appointment, action }) => {
  return (
    <tr>
      <td>{appointment.name}</td>
      <td>{appointment.email}</td>
      <td>{appointment.time}</td>
      <td>
        <button onClick={() => action(appointment)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
      <td>
        <button>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
