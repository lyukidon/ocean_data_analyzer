/** @jsxImportSource @emotion/react */
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";
import { css } from "@emotion/react";

// components
import Marker from "./Marker";
import MapInformation from "./MapInformation";

import { toggleType } from "../../../App";
import DataInformation from "./DataInformation";

const container = css`
    width: 100%;
    height: 100%;
`;

const mapContainer = css`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    @media (max-width: 767px) {
        position: relative;
    }
`;

const stContainer = css`
    padding: 2px;
    background-color: rgba(255, 255, 0, 1);
    border-radius: 10px;
`;

const stage = [
    {
        name: "st.3",
        lat: 33.44541,
        lng: 128.04924,
    },
    {
        name: "st.2",
        lat: 34.29124,
        lng: 128.48155,
    },
    {
        name: "st.1",
        lat: 35.02935,
        lng: 129.10696,
    },
];

interface Props {
    fileData: any[];
    setFileData: Dispatch<SetStateAction<any[]>>;
    selectedFileData: any[];
    setSelectedFileData: Dispatch<SetStateAction<any[]>>;
    toggle: toggleType;
    setToggle: Dispatch<SetStateAction<toggleType>>;
    handleToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface CenterType {
    lat: number;
    lng: number;
}

const MapComponent: React.FC<Props> = ({
    fileData,
    setFileData,
    selectedFileData,
    setSelectedFileData,
    toggle,
    setToggle,
    handleToggle,
}: Props) => {
    const [center, setCenter] = useState<CenterType>({
        lat: 33.44541,
        lng: 128.04924,
    });
    return (
        <div css={container}>
            {toggle.informationContainer && selectedFileData.length !== 0 && <DataInformation selectedFileData={selectedFileData} setSelectedFileData={setSelectedFileData} setToggle={setToggle} handleToggle={handleToggle} />}
            <Map css={mapContainer} center={center} level={13}>
                <MapInformation />
                {stage.map((st) => {
                    const { lat, lng, name } = st;
                    return (
                        <CustomOverlayMap key={name} position={{ lat, lng }}>
                            <div css={stContainer}>{name}</div>
                        </CustomOverlayMap>
                    );
                })}
                {selectedFileData.map((data) => {
                    return <Marker key={data["CAST#"]} data={data} center={center} setCenter={setCenter} />;
                })}
            </Map>
        </div>
    );
};

export default MapComponent;
