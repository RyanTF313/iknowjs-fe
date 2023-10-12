function Errors({ error }) {
  return (
    <div
      className="error-message"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#e23636",
        backgroundColor: "#000000",
        fontSize: "18px",
      }}
    >
      {!!error.code && <p>{error.code}</p>}
      {!!error.status && <p>{error.status}</p>}
      {!!error.message && <p>{error.message}</p>}
    </div>
  );
}

export default Errors;