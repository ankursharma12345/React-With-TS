import { useEffect, useState } from "react";
import ActiveTask from "./ActiveTask";
import CompletedTask from "./CompletedTask";


const MainPage = () => {
  const [formData, setFormData] = useState("");
  const [inputArr, setInputArr] = useState<string[]>([]); // Ek state banao jo string array store karegi, aur initially empty array hogi
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(value);
  }
  // const activeRef = useRef<ActiveTaskHandle>(null);
  // useRef ke saath aise likhne se TS ko btata h ki ref.current ke saath ActiveTaskHandle type ka ek object aayega , jisme setActiveTask name ki property hogi
  const handleAddTask = () => {
    // activeRef.current?.setActiveTask(formData);
    setFormData("");
    setInputArr((prev) => ([
      ...prev,
      formData
    ]));
  }

  useEffect(() => {
    const inputText = document.getElementById("task");
    inputText?.focus();
  }, [formData]);

  return (
    <>
      <div className="main-div">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h2 style={{ color: "white" }}>TASKIFY</h2>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
          <input
            placeholder="Enter a Task"
            id="task"
            autoFocus={true}
            onChange={(e) => {
              handleChange(e);
            }}
            value={formData}
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
            onClick={handleAddTask}
          >
            GO
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "3rem", gap: "1rem" }}>
          <ActiveTask inputArr={inputArr} />
          <CompletedTask />
        </div>
      </div>


    </>
  )
}
export default MainPage;