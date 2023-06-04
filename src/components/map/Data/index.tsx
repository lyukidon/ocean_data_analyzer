/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import React, { Dispatch, SetStateAction, useState } from "react";

import DataAnalyzer from "./DataAnalyzer";
import DateOption from "./DateOption";
import PositionOption from "./PositionOption";
import TopMenu from "./TopMenu";

import { toggleType } from "../../../App";

interface Props {
    fileData: any[];
    setFileData: Dispatch<SetStateAction<any[]>>;
    selectedFileData: any[];
    setSelectedFileData: Dispatch<SetStateAction<any[]>>;
    toggle: toggleType;
    setToggle: Dispatch<SetStateAction<toggleType>>;
    handleToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
interface containerProps {
    optionToggle: boolean;
}

const Index = ({
    fileData,
    setFileData,
    selectedFileData,
    setSelectedFileData,
    toggle,
    setToggle,
    handleToggle
}: Props) => {
    const container = css`
        background-color: rgb(46, 46, 46);
        height: 100vh;
        color: #fff;
        @media (max-width: 767px) {
            height: 100%;
        }
    `;

    const optionContainer = css`
        display: ${toggle.optionContainer ? "block" : "none"};
        > div {
            margin: 15px 10px;
            padding: 10px 10px;

        }
    `;

    return (
        <div css={container}>
            <TopMenu toggle={toggle} setToggle={setToggle} handleToggle={handleToggle} />
            {toggle.optionContainer && (
                <div css={optionContainer}>
                    <DataAnalyzer
                        fileData={fileData}
                        setFileData={setFileData}
                        selectedFileData={selectedFileData}
                    />
                    <DateOption
                        fileData={fileData}
                        setFileData={setFileData}
                        selectedFileData={selectedFileData}
                        setSelectedFileData={setSelectedFileData}
                        toggle={toggle}
                        setToggle={setToggle}
                    />
                    <PositionOption
                        fileData={fileData}
                        setFileData={setFileData}
                        selectedFileData={selectedFileData}
                        setSelectedFileData={setSelectedFileData}
                        toggle={toggle}
                        setToggle={setToggle}
                    />
                </div>
            )}
        </div>
    );
};

export default Index;
