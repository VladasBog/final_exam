import axios from "axios";
import { useState, useEffect } from "react";
import Form from "../../components/Form/Form";
import Table from "../../components/Table/Table";
import api from "../../shared/api";

const AppointmentsPage = () => {
  // State
  const [testData, setTestData] = useState(false);
  const [globalData, setGlobalData] = useState("");
  const [message, setMessage] = useState("");
  console.log(message);
  useEffect(() => {
    (async () => {
      const response = await api.getData();
      setGlobalData(response);
    })();
  }, [testData]);

  return (
    <div>
      <Form
        setTestData={setTestData}
        globalData={globalData}
        setMessage={setMessage}
      />

      <Table
        testData={testData}
        setTestData={setTestData}
        globalData={globalData}
        setMessage={setMessage}
      />
      {message && <p>{message}</p>}
    </div>
  );
};

export default AppointmentsPage;
