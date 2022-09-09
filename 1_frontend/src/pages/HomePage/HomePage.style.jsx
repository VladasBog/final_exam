import styled from "styled-components";

export const StyledWrapper = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  gap: 50px;
  h1 {
    margin-top: 50px;
    font-size: 40px;
    color: #fff;
  }
  span {
    display: block;
    font-size: 50px;
  }

  .card {
    background: linear-gradient(to top right, #313464, #6668c4);

    min-height: 400px;
    width: 90%;
    max-width: 600px;
    border-radius: 14px;
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 30px;
    }

    p {
      width: 100%;
      font-size: 20px;

      span {
        display: inline-block;
        font-size: 22px;
      }
    }

    a {
      width: 100%;
      max-width: 350px;
      padding: 1em 1.5em;
      background: linear-gradient(to top right, #786aac, #7d7fe9);

      font-size: 16px;
      font-weight: 700;

      border-radius: 24px;
      transition: 0.3s ease-in-out all;
      &:hover {
        transform: scale(1.1);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
    }
  }
`;
