import axios from "axios";

const HOST = "http://localhost:5000";

class API {
  async getData() {
    const { data } = await axios.get(HOST + `/api/appointments`);

    return data;
  }
  async createAppointment(appointmentData) {
    const { data } = await axios.post(
      HOST + `/api/appointments`,
      appointmentData
    );

    return data;
  }

  async updateAppointment(id, appointmentData) {
    const response = await axios.put(
      HOST + `/api/appointments/${id}`,
      appointmentData
    );
    return response;
  }

  async deleteAppointment(id) {
    const { data } = await axios.delete(`${HOST}/api/appointments/${id}`);

    return data;
  }
}

const api = new API();

export default api;
