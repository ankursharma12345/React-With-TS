/* eslint-disable no-debugger */
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
  const handleAddTask = () => {
    if (formData?.length === 0) return;
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
    if (!dragTask) return;
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
    <div>
      <div className="heading">
        <h2 className="gradient-title">TASKIFY APP</h2>
      </div>
      <div className="input-element">
        <input
          id="task"
          placeholder="Enter a Task"
          autoFocus={true}
          onChange={(e) => handleChange(e)}
          value={formData}
        />
        <button
          id="go-btn"
          onClick={handleAddTask}
        >
          GO
        </button>
      </div>
      <div className="child-elements">
        <ActiveTask activeTasks={activeTasks} handleDragStart={handleDragStart} updateData={updateData} deleteData={deleteData} />
        <CompletedTask updateTasksList={updateTasksList} completedTasks={completed} handleCompletedData={handleCompletedData} />
      </div>
    </div>
  )
}
export default MainPage;