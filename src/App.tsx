/** @jsxImportSource @emotion/react */
import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
    useCallback,
} from "react";
import { css } from "@emotion/react";

import Data from "./components/map/Data/index";
import MapComponent from "./components/map/Map/MapComponent";

const container = css`
    position: fixed;
    top:0;
    left: 0;
    display: flex;
    flex-direction: row;
    width: 100vw;
`;

function App() {
    const [fileData, setFileData]: [any[], Dispatch<SetStateAction<any[]>>] =
        useState<any[]>([]);

    const [selectedFileData, setSelectedFileData] = useState<any[]>([]);

    return (
        <div css={container}>
            <Data
                fileData={fileData}
                setFileData={setFileData}
                selectedFileData={selectedFileData}
                setSelectedFileData={setSelectedFileData}
            />
            <MapComponent fileData={fileData} setFileData={setFileData} selectedFileData={selectedFileData} />
        </div>
    );
}

export default App;
