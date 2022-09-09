// Hooks
import { Fragment, useState, useEffect, useRef } from "react";

// Components
import TableRow from "../TableRow/TableRow";
import TableEditableRow from "../TableEditableRow/TableEditableRow";

// Styles
import { StyledTable, StyledWarningMessageContainer } from "./Table.style";

// api
import api from "../../shared/api";

const Table = ({ updateData, setUpdateData, globalData, setMessage }) => {
  const [editTableData, setEditTableData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const [validationMessage, setValidationMessage] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    alreadyExists: "",
  });

  const [isAppointmentEdditable, setIsAppointmentEdditable] = useState("");

  // Refs
  const nameRef = useRef();
  const emailRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const initialSubmit = useRef(true);

  // Side effects
  useEffect(() => {
    setUpdateData(false);
  }, [updateData]);

  useEffect(() => {
    if (!initialSubmit.current) {
      validateInputs(
        editTableData.name,
        editTableData.email,
        editTableData.date,
        editTableData.time
      );
    }
  }, [
    editTableData.name,
    editTableData.email,
    editTableData.date,
    editTableData.time,
  ]);

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

  const validateInputs = (name, email, date, time) => {
    let isNameValid;
    let isEmailValid;
    let isDateValid;
    let isTimeValid;
    let isHoursValid;
    let isTimeFree = true;

    if (name.trim().split(" ").length < 2) {
      nameRef.current.style.borderColor = "red";
      isNameValid = false;
    } else {
      nameRef.current.style.borderColor = "green";
      isNameValid = true;
    }
    if (!email.includes("@")) {
      emailRef.current.style.borderColor = "red";
      isEmailValid = false;
    } else {
      emailRef.current.style.borderColor = "green";
      isEmailValid = true;
    }
    if (!date) {
      dateRef.current.style.borderColor = "red";
      isDateValid = false;
    } else {
      dateRef.current.style.borderColor = "green";
      isDateValid = true;
    }

    const TimeExists = globalData.some(
      (item) =>
        item.date === date &&
        item.time === time &&
        item._id !== isAppointmentEdditable
    );

    if (time) {
      const [hours, minutes] = time.split(":");
      if ((+hours >= 8 && +hours < 17) || (+hours === 17 && +minutes === 0)) {
        isHoursValid = true;

        if (+minutes === 0 || +minutes === 30) {
          timeRef.current.style.borderColor = "green";
          isTimeValid = true;
          if (TimeExists) {
            isTimeFree = false;
            timeRef.current.style.borderColor = "red";
            dateRef.current.style.borderColor = "red";
          }
        } else {
          timeRef.current.style.borderColor = "red";
          isTimeValid = false;
        }
      } else {
        timeRef.current.style.borderColor = "red";
        isHoursValid = false;
      }
    } else {
      timeRef.current.style.borderColor = "red";
      isTimeValid = false;
    }

    setValidationMessage({
      name: isNameValid
        ? ""
        : "Name and surname are required with space between",
      email: isEmailValid ? "" : "Email must be email and include @",
      date: isDateValid ? "" : "Add correct date",
      time: isTimeValid
        ? ""
        : isHoursValid
        ? "Time between appointments 30 minutes"
        : "Appointments time can be from 8:00 to 17:00",

      alreadyExists: isTimeFree
        ? ""
        : "Appointment in this time already exists",
    });

    return isNameValid &&
      isEmailValid &&
      isDateValid &&
      isTimeValid &&
      isTimeFree
      ? true
      : false;
  };
  const handleEditChange = (e) => {
    e.preventDefault();

    const newTableData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      date: dateRef.current.value,
      time: timeRef.current.value,
    };

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

    const isInputsValid = validateInputs(
      editTableData.name,
      editTableData.email,
      editTableData.date,
      editTableData.time
    );

    initialSubmit.current = false;

    if (isInputsValid) {
      const { data } = await api.updateAppointment(id, editedAppointment);

      setMessage(data.message);
      setIsAppointmentEdditable("");
      setUpdateData(true);

      initialSubmit.current = true;
    }
  };

  const handleDeleteClick = async (e, id) => {
    e.preventDefault();
    const { message } = await api.deleteAppointment(id);
    setMessage(message);
    setUpdateData(true);
  };
  const handleCancelClick = () => {
    initialSubmit.current = true;
    setIsAppointmentEdditable("");
    setUpdateData(true);
    setMessage("");
    setValidationMessage("");
  };

  return (
    <>
      <StyledWarningMessageContainer>
        {validationMessage && <p> {validationMessage.name}</p>}
        {validationMessage.email && <p>{validationMessage.email}</p>}
        {validationMessage.date && <p>{validationMessage.date}</p>}
        {validationMessage.time && <p>{validationMessage.time}</p>}
        {validationMessage.alreadyExists && (
          <p>{validationMessage.alreadyExists}</p>
        )}
      </StyledWarningMessageContainer>

      <form onSubmit={(e) => handleEditTableSubmit(e)}>
        <StyledTable>
          <thead>
            <tr>
              <th>Name and Surname</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          {globalData && (
            <tbody>
              {globalData.map((appointment) => (
                <Fragment key={appointment._id}>
                  {isAppointmentEdditable === appointment._id ? (
                    <TableEditableRow
                      editTableData={editTableData}
                      handleEditChange={handleEditChange}
                      handleCancelClick={handleCancelClick}
                      ref={{ nameRef, emailRef, dateRef, timeRef }}
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
          )}
        </StyledTable>
      </form>
    </>
  );
};

export default Table;
