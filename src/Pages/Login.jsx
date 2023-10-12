import { useEffect, useState, useContext } from "react";
import { ErrorContext, AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setError } = useContext(ErrorContext);
  const { setUser, user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      navigate("/profile/" + user.id);
    }
  }, [navigate, user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios({
      url: "http://localhost:3000/api/users/login",
      method: "POST",
      data: { username, password },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setIsLoading(false);
          setUser({ id: res.data.user, token: res.cookie });
          setError({});
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      {isLoading && <p>Spinner</p>}
      {!isLoading && (
        <form>
          <label>
            <p>Username:</p>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </label>
          <label>
            <p>Password:</p>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <div>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      )}

      <p>
        Don't have an account?{" "}
        <span>
          <a href="/signup">Sign Up</a>
        </span>{" "}
        here
      </p>
    </div>
  );
}

export default Login;
