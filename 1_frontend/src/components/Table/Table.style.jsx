import styled from "styled-components";

export const StyledTable = styled.table`
  color: #fff;
  border-collapse: collapse;
  margin: 25px 0;
  border-radius: 8px;
  overflow: hidden;
  width: 90%;
  margin: 0 auto;
  thead tr {
    background: linear-gradient(to top right, #313464, #6668c4);
    text-align: left;

    border-bottom: 2px solid #777;
  }

  th,
  td {
    padding: 12px 15px;
  }

  tbody tr {
    border-bottom: 1px solid #777;
    button {
      border: 0;
      background: none;
    }
    svg {
      color: #fff;
      font-size: 24px;

      &:hover {
        cursor: pointer;
      }
    }

    td:last-child {
      text-align: center;
      display: flex;
      justify-content: space-between;

      button:first-child {
        svg {
          &:hover {
            color: #60d394;
          }
        }
      }
      button:last-child {
        svg {
          &:hover {
            color: #ef233c;
          }
        }
      }
    }
  }
  tbody tr:nth-of-type(even) {
    background-color: #17123b;

    &:hover {
      background-color: #6668c4;
    }
  }

  tbody tr:nth-of-type(odd) {
    background-color: #313464;
    &:hover {
      background-color: #6668c4;
    }
  }
  tbody tr:last-of-type {
    border-bottom: 2px solid #777;
  }
`;

export const StyledWarningMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #ef233c;
  gap: 8px;
  height: 80px;
`;
