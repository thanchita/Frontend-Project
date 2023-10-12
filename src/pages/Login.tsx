import { FormEvent, useState } from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.container}>
      <form className={classes.loginForm} onSubmit={handleSubmit}>
        <h1 className={classes.title}>Login</h1>
        <div className={classes.form}>
          <div className={classes.form1}>
            <label className={classes.label}>Username</label>
            <input
              className={classes.input}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={classes.form1}>
            <label className={classes.label}>Password</label>
            <input
              className={classes.input}
              type="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input className={classes.button} type="submit" value="Login" />
        </div>
      </form>
      <h2 className={classes.subtitle}>Don't have an account? Register</h2>
    </div>
  );
};

export default Login;
