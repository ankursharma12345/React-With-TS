import { useEffect, useState } from "react";
import ActiveTask from "./ActiveTask";
import CompletedTask from "./CompletedTask";
import type { BtnTypes } from "./Interfaces/BtnInterface";
import "./Styles/MainPage.css";

const MainPage = () => {
  const [formData, setFormData] = useState("");
  const [activeTasks, setActiveTask] = useState<string[]>([]); // Ek state banao jo string array store karegi, aur initially empty array hogi
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [btnIndex, setBtnIndex] = useState<number | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(value);
  }
  // const activeRef = useRef<ActiveTaskHandle>(null);
  // useRef ke saath aise likhne se TS ko btata h ki ref.current ke saath ActiveTaskHandle type ka ek object aayega , jisme setActiveTask name ki property hogi
  const handleAddTask = () => {
    if (formData?.length === 0) return;
    // activeRef.current?.setActiveTask(formData);
    if (isEdit) {
      setActiveTask((prev) => prev.map((itm, index) => index === btnIndex ? formData : itm));
      setBtnIndex(null);
      setIsEdit(false);
    } else {
      setActiveTask((prev) => ([
        ...prev,
        formData
      ]));
    }
    setFormData("");
  }

  useEffect(() => {
    const inputText = document.getElementById("task");
    inputText?.focus();
  }, [formData]);

  const handleDragStart = (index: number): void => setDragIndex(index);

  const updateData = ({ taskName, btnIndex }: BtnTypes) => {
    setFormData(taskName);
    setIsEdit(true);
    setBtnIndex(btnIndex);
  };

  const deleteData = (delIndex: number) => {
    const updatedData = [...activeTasks];
    updatedData.splice(delIndex, 1);
    setActiveTask([...updatedData]);
  };

  const updateTasksList = () => {
    if (dragIndex === null) return;
    const dragTask = activeTasks[dragIndex];
    setActiveTask((prev) => prev.filter((_, inptIndex) => inptIndex !== dragIndex));
    setCompleted((prev) => ([...prev, dragTask]));
    setDragIndex(null);
  };

  const handleCompletedData = (index: number) => {
    const updateCompleteData = [...completed];
    updateCompleteData.splice(index, 1);
    setCompleted([...updateCompleteData]);
  }

  return (
    <div className="main-div">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h2 className="gradient-title" style={{ color: "white" }}>TASKIFY APP</h2>
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
        <ActiveTask activeTasks={activeTasks} handleDragStart={handleDragStart} updateData={updateData} deleteData={deleteData} />
        <CompletedTask updateTasksList={updateTasksList} completedTasks={completed} handleCompletedData={handleCompletedData} />
      </div>
    </div>
  )
}
export default MainPage;