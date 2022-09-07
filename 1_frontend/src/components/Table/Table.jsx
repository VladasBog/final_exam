import { Fragment, useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

import TableRow from "../TableRow/TableRow";
import TableEditableRow from "../TableEditableRow/TableEditableRow";
import api from "../../shared/api";
import axios from "axios";

const Table = ({ testData, setTestData, globalData, setMessage }) => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [message, setMessage] = useState("");
  const reFetch = async () => {
    const { data } = await axios.get("http://localhost:5000/api/appointments");

    setAppointmentsData(data);
  };
  useEffect(() => {
    reFetch();
    setTestData(false);
  }, [testData]);
  // State

  const [editTableData, setEditTableData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });
  console.log(editTableData);
  const [isAppointmentEdditable, setIsAppointmentEdditable] = useState("");

  // Functions

  const handleEditClick = (e, appointment) => {
    e.preventDefault();

    setIsAppointmentEdditable(appointment._id);
    setMessage("");
    const tableValues = {
      name: appointment.name,
      email: appointment.email,
      date: appointment.date,
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

  const handleEditTableSubmit = async (e) => {
    e.preventDefault();
    const id = isAppointmentEdditable;
    const editedAppointment = {
      _id: isAppointmentEdditable,
      name: editTableData.name,
      email: editTableData.email,
      date: editTableData.date,
      time: editTableData.time,
    };

    const newAppointment = [...appointmentsData];
    const index = appointmentsData.findIndex(
      (appointment) => appointment._id === isAppointmentEdditable
    );
    newAppointment[index] = editedAppointment;
    console.log(editedAppointment.date);
    console.log(editedAppointment.time);
    setAppointmentsData(newAppointment);
    const found = globalData.find(
      (item) =>
        item.date === editedAppointment.date &&
        item.time === editedAppointment.time
    );

    if (!found) {
      await api.updateAppointment(editedAppointment._id, editedAppointment);
    }

    setIsAppointmentEdditable("");
    setTestData(true);
  };

  const handleDeleteClick = async (e, id) => {
    e.preventDefault();
    const { message } = await api.deleteAppointment(id);
    setMessage(message);
    setTestData(true);
  };
  const handleCancelClick = () => {
    setIsAppointmentEdditable("");
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={(e) => handleEditTableSubmit(e)}>
          <table>
            <thead>
              <tr>
                <th>Name and Surname</th>
                <th>Email</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsData &&
                appointmentsData.map((appointment) => (
                  <Fragment key={appointment._id}>
                    {isAppointmentEdditable === appointment._id ? (
                      <TableEditableRow
                        editTableData={editTableData}
                        handleEditChange={handleEditChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <TableRow
                        key={appointment._id}
                        appointment={appointment}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
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
