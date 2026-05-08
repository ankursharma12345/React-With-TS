const MainPage = () => {
  return (
    <div className="main-div">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h2 style={{ color: "white" }}>TASKIFY</h2>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
        <input
          placeholder="Enter a Task"
          autoFocus={true}
          style={{
            width: "100%",
            borderRadius: "8px",
            padding: "10px 70px 10px 10px",
            fontSize: "20px",
            boxSizing: "border-box",
          }}
        />
        <button
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            border: "none",
            background: "#1976d2",
            color: "white",
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          GO 😊
        </button>
      </div>
    </div>
  )
}
export default MainPage;