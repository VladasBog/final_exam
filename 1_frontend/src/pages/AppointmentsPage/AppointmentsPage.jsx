// Hooks
import { useState, useEffect } from "react";

// Components
import Form from "../../components/Form/Form";
import Table from "../../components/Table/Table";

// Styles
import {
  StyledMain,
  StyledMessage,
  StyledMessageContainer,
} from "./AppointmentsPage.style";

// api
import api from "../../shared/api";

const AppointmentsPage = () => {
  // State
  const [updateData, setUpdateData] = useState(false);
  const [globalData, setGlobalData] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const response = await api.getData();
      setGlobalData(response);
    })();
  }, [updateData]);

  return (
    <StyledMain>
      <Form
        setUpdateData={setUpdateData}
        globalData={globalData}
        setMessage={setMessage}
      />
      <StyledMessageContainer>
        {message && <StyledMessage>{message}</StyledMessage>}
      </StyledMessageContainer>
      <Table
        updateData={updateData}
        setUpdateData={setUpdateData}
        globalData={globalData}
        setMessage={setMessage}
      />
    </StyledMain>
  );
};

export default AppointmentsPage;
