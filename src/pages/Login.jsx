import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Login() {
  const navigate = useNavigate();

  //? 1. load authenticated user
  const { isLoading, user, isAuthenticated } = useUser();

  //? 2. if there is NO authenticated user, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  //? 3. while loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  if (isAuthenticated) navigate("/dashboard/");
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Login to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
