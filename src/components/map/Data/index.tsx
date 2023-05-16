/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import React, { Dispatch, SetStateAction, useState } from "react";
import { FaBars } from "react-icons/fa";

import DataAnalyzerComp from "./DataAnalyzerComp";
import DateOption from "./DateOption";
import PositionOption from "./PositionOption";

interface Props {
    fileData: any[];
    setFileData: Dispatch<SetStateAction<any[]>>;
    selectedFileData: any[];
    setSelectedFileData: Dispatch<SetStateAction<any[]>>;
}
interface containerProps {
    optionToggle: boolean;
}

const Index = ({
    fileData,
    setFileData,
    selectedFileData,
    setSelectedFileData,
}: Props) => {
    const [optionToggle, setOptionToggle] = useState(true);

    const container = css`
        background-color: rgb(46, 46, 46);
        border-right: 3px solid rgb(0, 0, 0);
        height: 100vh;
        color: #fff;
        @media (max-width: 767px) {
            height: 100%;
        }
        > button {
            background-color: #686868;
            color:#fff;
            border: none;
            padding: 5px 8px;
            margin: 5px;
            font-size: 19px;
        }
    `;

    const optionContainer = css`
        display: ${optionToggle ? 'block':'none'};
        > div {
            margin: 20px 10px;
        }
    `;

    return (
        <div css={container}>
            <button onClick={() => setOptionToggle((prev) => !prev)}>
                <FaBars />
            </button>

                <div css={optionContainer}>
                    <DataAnalyzerComp
                        fileData={fileData}
                        setFileData={setFileData}
                    />
                    <hr/>
                    <DateOption
                        fileData={fileData}
                        setFileData={setFileData}
                        selectedFileData={selectedFileData}
                        setSelectedFileData={setSelectedFileData}
                    />
                    <hr />
                    <PositionOption
                        fileData={fileData}
                        setFileData={setFileData}
                        selectedFileData={selectedFileData}
                        setSelectedFileData={setSelectedFileData}
                    />
                    <hr />
                </div>
        </div>
    );
};

export default Index;
