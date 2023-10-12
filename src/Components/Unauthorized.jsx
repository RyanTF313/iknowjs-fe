import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div>
      <div>
        <h1>I know JS</h1>
        <button>
          <Link to="/login" style={{}}>
            <div>Login</div>
          </Link>
        </button>
        <button>
          <Link to="/signup" style={{}}>
            <div>Sign Up</div>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;
