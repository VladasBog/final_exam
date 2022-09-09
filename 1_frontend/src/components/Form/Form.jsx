// Hooks
import { useState, useRef, useEffect } from "react";

// Styles
import { StyledForm, StyledWarningMessage } from "./Form.style";

// api
import api from "../../shared/api";

const Form = ({ setUpdateData, globalData, setMessage }) => {
  // State
  const [appointment, setAppointment] = useState({
    name: "",
    email: "",
    date: `${new Date().toLocaleDateString()}`,
    time: `${new Date().getHours()}:${("0" + new Date().getMinutes()).slice(
      -2
    )}`,
  });

  const [validationMessage, setValidationMessage] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  // Refs
  const nameRef = useRef();
  const emailRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const initialSubmit = useRef(true);

  // Side effects
  useEffect(() => {
    if (!initialSubmit.current) {
      validateInputs(
        appointment.name,
        appointment.email,
        appointment.date,
        appointment.time
      );
    }
  }, [appointment.name, appointment.email, appointment.date, appointment.time]);

  // Functions
  const submitHandler = async (e) => {
    e.preventDefault();
    setUpdateData(true);

    const isInputsValid = validateInputs(
      appointment.name,
      appointment.email,
      appointment.date,
      appointment.time
    );

    const timeExists = globalData.find(
      (item) => item.date === appointment.date && item.time === appointment.time
    );

    initialSubmit.current = false;

    if (!isInputsValid) {
      setMessage("");
      return;
    } else if (timeExists) {
      dateRef.current.style.borderColor = "#ef233c";
      timeRef.current.style.borderColor = "#ef233c";
      setMessage("Appointment already exists");
      return;
    }

    const { message } = await api.createAppointment(appointment);
    setMessage(message);

    setAppointment({
      name: "",
      email: "",
      date: `${new Date().toLocaleDateString()}`,
      time: `${new Date().getHours()}:${("0" + new Date().getMinutes()).slice(
        -2
      )}`,
    });
    initialSubmit.current = true;
    nameRef.current.style.borderColor = "";
    nameRef.current.style.borderColor = "";
    emailRef.current.style.borderColor = "";
    dateRef.current.style.borderColor = "";
    timeRef.current.style.borderColor = "";
  };

  const validateInputs = (name, email, date, time) => {
    let isNameValid;
    let isEmailValid;
    let isDateValid;
    let isTimeValid;
    let isHoursValid;

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

    if (time) {
      const [hours, minutes] = time.split(":");
      if ((+hours >= 8 && +hours < 17) || (+hours === 17 && +minutes === 0)) {
        isHoursValid = true;
        if (+minutes === 0 || +minutes === 30) {
          timeRef.current.style.borderColor = "green";
          isTimeValid = true;
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
    });

    return isNameValid && isEmailValid && isDateValid && isTimeValid
      ? true
      : false;
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <div>
        <label htmlFor="name">Name</label>

        <input
          type="text"
          value={appointment.name}
          onChange={(e) =>
            setAppointment((prev) => ({ ...prev, name: e.target.value }))
          }
          ref={nameRef}
        />
        {validationMessage.name && (
          <StyledWarningMessage>{validationMessage.name}</StyledWarningMessage>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>

        <input
          type="email"
          value={appointment.email}
          onChange={(e) =>
            setAppointment((prev) => ({ ...prev, email: e.target.value }))
          }
          ref={emailRef}
        />
        {validationMessage.email && (
          <StyledWarningMessage>{validationMessage.email}</StyledWarningMessage>
        )}
      </div>
      <div>
        <label htmlFor="date">Date</label>

        <input
          type="date"
          value={appointment.date}
          onChange={(e) =>
            setAppointment((prev) => ({ ...prev, date: e.target.value }))
          }
          ref={dateRef}
        />
        {validationMessage.date && (
          <StyledWarningMessage>{validationMessage.date}</StyledWarningMessage>
        )}
      </div>
      <div>
        <label htmlFor="time">Time</label>

        <input
          type="time"
          id="time"
          value={appointment.time}
          onChange={(e) => {
            setAppointment((prev) => ({ ...prev, time: e.target.value }));
          }}
          ref={timeRef}
        />
        {validationMessage.time && (
          <StyledWarningMessage>{validationMessage.time}</StyledWarningMessage>
        )}
      </div>
      <div>
        <input type="submit" value="Create appointment" />
      </div>
    </StyledForm>
  );
};

export default Form;
