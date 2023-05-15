import React, { Dispatch, SetStateAction } from "react";

import DataAnalyzerComp from "./DataAnalyzerComp";
import DateOption from "./DateOption";
import PositionOption from './PositionOption';

interface Props {
    fileData: any[];
    setFileData: Dispatch<SetStateAction<any[]>>;
    selectedFileData: any[];
    setSelectedFileData: Dispatch<SetStateAction<any[]>>;
}

const Index = ({
    fileData,
    setFileData,
    selectedFileData,
    setSelectedFileData,
}: Props) => {
    return (
        <div>
            <DataAnalyzerComp fileData={fileData} setFileData={setFileData} />
            <DateOption
                fileData={fileData}
                setFileData={setFileData}
                selectedFileData={selectedFileData}
                setSelectedFileData={setSelectedFileData}
            />
            <PositionOption
                fileData={fileData}
                setFileData={setFileData}
                selectedFileData={selectedFileData}
                setSelectedFileData={setSelectedFileData}
             />
        </div>
    );
};

export default Index;
