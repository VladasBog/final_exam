import styled from "styled-components";

export const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-center {
    width: 90vw;
    max-width: 1024px;
    margin-top: 20px;
    .nav-header {
      height: 3em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .nav-btn {
        padding: 0.4em 1em;
        border: 0;
        border-radius: 4px;
        color: #fff;
        background: linear-gradient(to top right, #786aac, #7d7fe9);
        transition: 0.3s ease-in-out all;
        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
        svg {
          font-size: 1.5rem;
        }
      }
    }
    .nav-links {
      height: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: 0.3s ease-in-out all;
    }
    .show-links {
      height: 8em;
    }
    .nav-link {
      display: block;
      text-align: center;
      font-size: 1.5em;
      padding: 1rem 0;
      border-top: 1px solid #8a8eeb;
    }
  }
  @media screen and (min-width: 768px) {
    height: 4em;

    .nav-center {
      display: flex;
      align-items: center;

      .nav-header {
        height: auto;
        margin-bottom: 0;
        a {
          width: 100%;
        }
      }

      .nav-btn {
        display: none;
      }
      .nav-links {
        height: auto;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
      .nav-link {
        padding: 0;
        border-top: 1px solid #8a8eeb;
        border-top: none;
        margin-right: 1rem;
        font-size: 1rem;
      }
    }
  }
`;
