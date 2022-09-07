import styled from "styled-components";

export const StyledForm = styled.form`
  input[type="time"] {
    background: #fff;
  }

  input[type="time"]:before {
    content: "";
    color: #9d9d9d;
    position: absolute;
    background: #fff;
    width: 70px;
  }

  input[type="time"]:focus:before {
    width: 0;
    content: "";
  }
`;
