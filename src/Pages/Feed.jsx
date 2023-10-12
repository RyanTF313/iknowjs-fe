import { useState } from "react";

function Feed() {
    const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
    // setCharacters(null);
    // setIsLoading(true);
    // setError({})
    if (!e.target.value) {
    //   setIsLoading(false);
      return;
    }
    fetch(
      
    )
      .then((response) => response.json())
      .then((data) => {
        // setCharacters(data.data.results);
        // setIsLoading(false);
      })
      .catch((err) => {
        // setIsLoading(false);
        // setError(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setError({});
    // setCharacters(null);
    // setIsLoading(true);
    if (!inputValue) {
    //   setIsLoading(false);
    //   setError({
    //     status: "Invalid Input Value",
    //     message: "You must enter a name",
    //   });

      return;
    }

    fetch(
      
    )
      .then((response) => response.json())
      .then((data) => {
        // setCharacters(data.data.results);
        // setIsLoading(false);
      })
      .catch((err) => {
        // setIsLoading(false);
        // setError(err);
      });
  };
    // list all Users to be clicked and go to profile
  return (
    <div>
        <h1>Feed</h1>
        <h3>Find another learner to learn from or with!</h3>
    <div className="Search" style={{}}>
      <h2 style={{}}>Input your character Name:</h2>
      <form className="learner-search">
        <input
          type="text"
          name="search"
          id=""
          value={inputValue}
          onChange={handleChange}
          style={{}}
          placeholder="Enter learner's name"
        />
        <button onClick={handleSubmit} style={{}}>
          Search
        </button>
      </form>
    </div>
    </div>
  )
}

export default Feed