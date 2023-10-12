import { useEffect, useState, useContext } from "react";
import { ErrorContext, AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: "http://localhost:3000/api/users/register",
      method: "POST",
      // headers: {
      //   authorization: "your token comes here",
      // },
      data: { username, email, password },
    })
      .then((res) => {
        if (res.data) {
          setIsLoading(false);
          setUser({ id: res.data.user._id, token: res.cookie });
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
      <h1>Sign Up</h1>
      {isLoading && <p>Spinner</p>}
      {!isLoading && (
        <form>
          <label>
            <p>Username:</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            <p>Email:</p>
            <input
              type="text"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <p>Password:</p>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
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
        Already have an account?{" "}
        <span>
          <a href="/login">Login</a>
        </span>
      </p>
    </div>
  );
}

export default SignUp;
