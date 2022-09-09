import styled from "styled-components";

export const StyledTableRow = styled.tr`
  input {
    border: 2px solid transparent;
    border-radius: 8px;
    padding: 8px 8px;
    color: #17123b;
    font-size: 16px;

    &:focus {
      outline: none;
      border: 2px solid #6bbed8;
    }
    &:hover {
      outline: none;
      border: 2px solid #6bbed8;
    }
  }
  td:last-child {
    flex-direction: column;
    gap: 10px;

    button {
      background-color: #c9ada7;
      padding: 8px;
      color: #fff;
      border-radius: 8px;
      &:hover {
        cursor: pointer;
      }
    }

    button:first-child:hover {
      background-color: #60d394;
    }
    button:last-child:hover {
      color: #fff;
      background-color: #ced4da;
    }
  }
`;
