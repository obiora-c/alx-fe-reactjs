import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    navigate("/profile");
  };

  return (
    <>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}
