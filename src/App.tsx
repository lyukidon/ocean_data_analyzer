import React, {Dispatch, SetStateAction, useEffect, useState, useCallback} from "react";

import Data from './components/map/Data'
import MapComponent from "./components/map/MapComponent";

function App() {
    const [fileData, setFileData]:[any[], Dispatch<SetStateAction<any[]>>] = useState<any[]>([]);

    return (
        <div>
            <Data fileData={fileData} setFileData={setFileData} />
            <MapComponent fileData={fileData} setFileData={setFileData} />
        </div>
    );
}

export default App;
