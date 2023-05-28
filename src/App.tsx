/** @jsxImportSource @emotion/react */
import React, {
    Dispatch,
    SetStateAction,
    useState,
} from "react";
import { css } from "@emotion/react";

import Data from "./components/map/Data/index";
import Map from "./components/map/Map";
import { data } from "./data.js";

const container = css`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    width: 100vw;
    @media (max-width: 767px) {
        display: flex;
        flex-direction: column;
    }
`;

export interface toggleType {
    optionContainer: boolean;
    dateOption: boolean;
    positionOption: boolean;
    informationContainer: boolean;
    [action: string]: boolean;
}

function App() {
    const [fileData, setFileData]: [any[], Dispatch<SetStateAction<any[]>>] =
        useState<any[]>([...data]);

    const [selectedFileData, setSelectedFileData] = useState<any[]>([]);

    const [toggle, setToggle]: [
        toggleType,
        Dispatch<SetStateAction<toggleType>>
    ] = useState<toggleType>({
        optionContainer: true,
        dateOption: false,
        positionOption: false,
        informationContainer: false,
    });

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        const action: string = e.currentTarget.dataset.action!;
        setToggle((prev) => {
            return { ...prev, [action]: !prev[action] };
        });
    };

    return (
        <div css={container}>
            <Data
                fileData={fileData}
                setFileData={setFileData}
                selectedFileData={selectedFileData}
                setSelectedFileData={setSelectedFileData}
                toggle={toggle}
                setToggle={setToggle}
                handleToggle={handleToggle}
            />
            <Map
                fileData={fileData}
                setFileData={setFileData}
                selectedFileData={selectedFileData}
                setSelectedFileData={setSelectedFileData}
                toggle={toggle}
                setToggle={setToggle}
                handleToggle={handleToggle}
            />
        </div>
    );
}

export default App;
