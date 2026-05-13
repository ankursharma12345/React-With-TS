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
        <div className="main-div">
            <div className="header-div">
                <h2 className="heading">Active Tasks</h2>
            </div>
            <div style={{ margin: "1rem 0 1rem 0" }}>
                {taskLists?.map((item, taskIndex) => {
                    return (
                        <div
                            key={taskIndex}
                            draggable={true}
                            onDragStart={() => handleDragStartIndex(taskIndex)} // Dragged item ko store krta h
                            id="act-content"
                        >
                            <h3 id="act-name">
                                {item}
                            </h3>
                            <div id="act-btns">
                                {buttons.map((btn, index) => (
                                    <div key={index}>
                                        <button id="active-btn" onClick={() => handleBtnClick(btn.type, taskIndex)}>
                                            <img className="icon" src={btn.img} alt="none" />
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