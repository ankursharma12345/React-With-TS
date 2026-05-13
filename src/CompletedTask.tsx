import checkMark from "./Images/complete.png"

interface PropType {
    updateTasksList: () => void;
    completedTasks: string[];
    handleCompletedData: (index: number) => void;
}

const CompletedTask = ({ updateTasksList, completedTasks, handleCompletedData }: PropType) => {

    const handleDrop = () => updateTasksList();

    const handleCompleted = (indx: number) => handleCompletedData(indx);

    return (
        <div
            onDrop={handleDrop} // Dragged item ko new position par insert karte hain.
            onDragOver={(e) => e.preventDefault()}
            className="main-div"
        >
            <div className="header-div">
                <h2 className="heading">Completed Tasks</h2>
            </div>
            <div style={{ margin: "1rem 0 1rem 0" }}>
                {completedTasks.map((itm, indx) => {
                    return (
                        <div
                            key={indx}
                            style={{
                                width: "90%",
                                height: "60px",
                                backgroundColor: "seagreen",
                                borderRadius: "10px",
                                margin: "1rem 0 0 1.4rem",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                paddingLeft: "1rem"
                            }}
                        >
                            <h3 style={{ color: "white" }}>
                                {itm}
                            </h3>
                            <button className="active-btn" onClick={() => handleCompleted(indx)}>
                                <img src={checkMark} height="20px" width="20px" alt="none" />
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default CompletedTask;