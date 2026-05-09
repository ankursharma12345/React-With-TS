import React from "react";

interface PropType {
    inputArr: string[];
}

const ActiveTask = ({ inputArr }: PropType) => {

    const taskLists = inputArr.length === 0 ? [""] : inputArr;

    return (
        <div
            style={{
                backgroundColor: "yellowgreen",
                height: "266px",
                width: "50%",
                borderRadius: "10px"
            }}
        >
            {taskLists.map((item, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            width: "90%",
                            height: "60px",
                            backgroundColor: "seagreen",
                            borderRadius: "10px",
                            margin: "1rem 0 0 1rem",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            paddingLeft: "1rem"
                        }}
                    >
                        <h3 style={{ color: "white" }}>
                            {item}
                        </h3>
                    </div>
                )
            })}

        </div>
    );
};

export default React.memo(ActiveTask);