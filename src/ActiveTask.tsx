import React from "react";
import "./Styles/ActiveTask.css";
import { ButtonType } from "./Enums/ButtonEnums";
import { buttons } from "./utils";
import type { BtnTypes } from "./Interfaces/BtnInterface";

interface PropType {
    activeTasks: string[];
    handleDragStart: (index: number) => void;
    updateData: (data: BtnTypes) => void;
    deleteData: (index: number) => void;
}

const ActiveTask = ({ activeTasks, handleDragStart, updateData, deleteData }: PropType) => {
    const taskLists = activeTasks.length === 0 ? [""] : activeTasks;

    const handleBtnClick = (btnType: string, btnIndex: number) => {
        const taskName = taskLists.filter((_, index) => index === btnIndex)?.[0];
        if (btnType === ButtonType.EDIT) {
            updateData({ taskName, btnIndex });
            return;
        }
        if (btnType === ButtonType.DELETE) deleteData(btnIndex);
    };

    const handleDragStartIndex = (index: number) => handleDragStart(index);

    return (
        <div
            style={{
                backgroundColor: "yellowgreen",
                height: "auto",
                width: "50%",
                borderRadius: "10px"
            }}
        >
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "-1rem" }}>
                <h2 style={{ textTransform: "uppercase" }}>Active Tasks</h2>
            </div>
            <div style={{ margin: "1rem 0 1rem 0" }}>
                {taskLists?.map((item, taskIndex) => {
                    return (
                        <div
                            key={taskIndex}
                            draggable={true}
                            onDragStart={() => handleDragStartIndex(taskIndex)} // Dragged item ko store krta h
                            style={{
                                width: "90%",
                                height: "60px",
                                backgroundColor: "seagreen",
                                borderRadius: "10px",
                                margin: "1rem 0 0 1.4rem",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <h3 style={{ color: "white", marginLeft: "1rem" }}>
                                {item}
                            </h3>
                            <div style={{ gap: "0.5rem", display: "flex", alignItems: "center" }}>
                                {buttons.map((btn, index) => (
                                    <div key={index}>
                                        <button className="active-btn" onClick={() => handleBtnClick(btn.type, taskIndex)}>
                                            <img src={btn.img} height="20px" width="20px" alt="none" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    );
};

export default React.memo(ActiveTask);