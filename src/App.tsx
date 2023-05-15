/** @jsxImportSource @emotion/react */
import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
    useCallback,
} from "react";
import { css } from "@emotion/react";

import Data from "./components/map/Data";
import MapComponent from "./components/map/MapComponent";

const container = css`
    display: flex;
    flex-direction: column;

`

function App() {
    const [fileData, setFileData]: [any[], Dispatch<SetStateAction<any[]>>] =
        useState<any[]>([]);

    return (
        <div css={container}>
            <Data fileData={fileData} setFileData={setFileData} />
            <MapComponent fileData={fileData} setFileData={setFileData} />
        </div>
    );
}

export default App;
