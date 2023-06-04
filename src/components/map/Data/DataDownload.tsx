import React from "react";
import { FaDownload } from "react-icons/fa";

interface Props {
    fileData: any[];
    selectedFileData: any[];
}

const DataDownload: React.FC<Props> = ({ fileData, selectedFileData }: Props) => {
    const handleClick = (data: any) => {
        const jsonStr = JSON.stringify(data); // JSON 데이터를 문자열로 변환

        const element = document.createElement("a");
        const file = new Blob([jsonStr], { type: "application/json" });
        element.href = URL.createObjectURL(file);
        element.download = "data.json";
        document.body.appendChild(element); // 버튼을 추가한 후 클릭 이벤트 발생
        element.click();
        document.body.removeChild(element); // 버튼을 제거

        URL.revokeObjectURL(element.href);
    };

    return (
        <div>
            <button onClick={() => handleClick(fileData)}>
                {" "}
                <FaDownload /> Save Full Data as JSON{" "}
            </button>
            <button 
                onClick={() => handleClick(selectedFileData)}
                disabled={selectedFileData.length === 0}
            >
                <FaDownload /> Save Selected Data as JSON
            </button>
        </div>
    );
};

export default DataDownload;
