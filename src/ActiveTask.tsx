/* eslint-disable no-debugger */
import React from "react";
import "./Styles/ActiveTask.css";
import { ButtonType } from "./Enums/ButtonEnums";
import { buttons } from "./utils";

interface BtnTypes {
    taskName: string;
    btnIndex: number;
    editClick: boolean;
}
interface PropType {
    inputArr: string[];
    handleDragStart: (index: number) => void;
    handleDropIndex: (index: number) => void;
    updateData: (data: BtnTypes) => void;
}

const ActiveTask = ({ inputArr, handleDragStart, handleDropIndex, updateData }: PropType) => {
    const taskLists = inputArr.length === 0 ? [""] : inputArr;

    const handleBtnClick = (btnType: string, btnIndex: number) => {
        const taskName = taskLists.filter((_, index) => index === btnIndex)?.[0];
        if (btnType === ButtonType.EDIT) {
            updateData({ taskName, btnIndex, editClick: true });
        }
        if (btnType === ButtonType.DELETE) console.log(`On Delete , ${btnIndex}`);
    };

    const handleDragStartIndex = (index: number) => {
        handleDragStart(index);
    };

    const handleDrop = (index: number) => {
        handleDropIndex(index);
    }

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
                <h2>Active Tasks</h2>
            </div>
            <div style={{ margin: "1rem 0 1rem 0" }}>
                {taskLists.map((item, taskIndex) => {
                    return (
                        <div
                            key={taskIndex}
                            draggable={true}
                            onDragStart={() => handleDragStartIndex(taskIndex)} // Drag item ko store krta h 
                            onDragOver={(e) => e.preventDefault()} // Ye drop allow krne ke liye required hai
                            onDrop={() => handleDrop(taskIndex)} // Dragged item ko new position par insert karte hain.
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