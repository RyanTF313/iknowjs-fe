import Unauthorized from "../Components/Unauthorized";
import Feed from "./Feed";
import { useContext } from "react";

import { AuthContext } from "../App";

function Home() {
  const { user } = useContext(AuthContext);
  return <div>{user._id ? <Feed /> : <Unauthorized />}</div>;
}

export default Home;
