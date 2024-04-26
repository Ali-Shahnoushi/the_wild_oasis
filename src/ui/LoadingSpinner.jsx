import styled from "styled-components";
import Spinner from "./Spinner";

const ContainerLoading = styled.div`
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  position: fixed !important;
  background-color: #ffffff6c;
  backdrop-filter: blur(3px);
  transition: all 0.3s;
`;

export default function LoadingSpinner() {
  return (
    <ContainerLoading>
      <Spinner />
    </ContainerLoading>
  );
}
