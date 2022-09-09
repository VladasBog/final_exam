import styled from "styled-components";

export const StyledForm = styled.form`
  width: 90%;
  max-width: 600px;
  background: linear-gradient(to top right, #313464, #6668c4);
  border-radius: 14px;
  margin: 0 auto;
  padding: 20px;

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;

    input {
      border: 2px solid transparent;
      border-radius: 8px;
      padding: 8px 8px;
      color: #17123b;
      font-size: 16px;
      &:focus {
        outline: none;
        border: 2px solid #6f63a1;
      }
      &:hover {
        border: 2px solid #6f63a1;
      }

      p {
        color: #ef233c;
      }
    }
  }

  div:last-child {
    padding-top: 50px;
    align-items: center;
  }

  input[type="submit"] {
    color: #fff;
    border: 0;
    outline: 0;
    width: 100%;
    max-width: 350px;
    padding: 1em 1.5em;
    background: linear-gradient(to top right, #786aac, #7d7fe9);

    font-size: 16px;
    font-weight: 700;

    border-radius: 24px;
    transition: 0.3s ease-in-out all;
    &:hover {
      outline: 0;
      border: 0;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    &:focus {
      outline: 0;
      border: 0;
    }
  }
`;

export const StyledWarningMessage = styled.p`
  color: #ef233c;
  font-size: 16px;
  font-weight: 600;
`;
