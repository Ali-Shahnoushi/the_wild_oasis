import styled, { css } from "styled-components";

const textAlignCenter = css`
  text-align: center;
`;

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 32px;
      text-transform:capitalize
      font-weight: 800;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 24px;
      text-transform: capitalize;
      font-weight: 700;
    `}

${(props) =>
    props.as === "h3" &&
    css`
      font-size: 18px;
      text-transform: capitalize;
      font-weight: 600;
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      text-transform: capitalize;
      font-weight: 600;
      text-align: center;
    `}
`;

export default Heading;
