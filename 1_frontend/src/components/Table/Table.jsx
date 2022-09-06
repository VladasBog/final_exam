import { Fragment, useState } from "react";
import useFetch from "../../hooks/useFetch";

import TableRow from "../TableRow/TableRow";
import TableEditableRow from "../TableEditableRow/TableEditableRow";

const Table = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:5000/api/appointments"
  );

  // State
  const testData = data;
  const [testChange, setTestChange] = useState([]);

  const [editTableData, setEditTableData] = useState({
    name: "",
    email: "",
    // date: "",
    time: "",
  });

  const [isAppointmentEdditable, setIsAppointmentEdditable] = useState("");

  // Functions
  const handleEdit = (appointment) => {
    setIsAppointmentEdditable(appointment._id);

    const tableValues = {
      name: appointment.name,
      email: appointment.email,
      // date: appointment.date,
      time: appointment.time,
    };
    setEditTableData(tableValues);
  };

  const handleEditChange = (e) => {
    const fieldName = e.target.getAttribute("id");

    const fieldValue = e.target.value;
    const newTableData = { ...editTableData };
    newTableData[fieldName] = fieldValue;

    setEditTableData(newTableData);
  };

  const handleEditTableSubmit = (e) => {
    e.preventDefault();
    const editedAppointment = {
      _id: isAppointmentEdditable,
      name: editTableData.name,
      email: editTableData.email,
      // date: editTableData.date,
      time: editTableData.time,
    };
    const newAppointment = [...testData];
    const index = testData.findIndex(
      (appointment) => appointment._id === isAppointmentEdditable
    );
    newAppointment[index] = editedAppointment;
    setTestChange(newAppointment);
    setIsAppointmentEdditable("");
  };

  console.log(testData);
  console.log(testChange);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={handleEditTableSubmit}>
          <table>
            <thead>
              <tr>
                <th>Name and Surname</th>
                <th>Email</th>
                <th>Appointment Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((appointment) => (
                  <Fragment key={appointment._id}>
                    {isAppointmentEdditable === appointment._id ? (
                      <TableEditableRow
                        editTableData={editTableData}
                        action={handleEditChange}
                      />
                    ) : (
                      <TableRow
                        key={appointment._id}
                        appointment={appointment}
                        action={handleEdit}
                      />
                    )}
                  </Fragment>
                ))}
            </tbody>
          </table>
        </form>
      )}
    </>
  );
};

export default Table;
