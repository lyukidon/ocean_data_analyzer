/** @jsxImportSource @emotion/react */
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
    Map,
    MapMarker,
    CustomOverlayMap,
    Polyline,
} from "react-kakao-maps-sdk";
import { css } from "@emotion/react";

// components
import Marker from "./Marker";
import MapInformation from "./MapInformation";

const container = css`
    width: 90%;
    margin: 0 auto;
    max-width: 1200px;
    height: calc(100vh - 40px);
    @media screen and (max-width: 768px) {
        width: 100%;
        padding: 0 20px;
        height: 100vh;
    }
    border: 1px solid black;
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
}

export interface MarkerData {
    "CAST#": number;
    YYYY: number;
    MM: number;
    DD: number;
    LAT: number;
    LON: number;
    Z: number[];
    T: number[];
    S: number[];
}

const MapComponent: React.FC<Props> = ({ fileData, setFileData, selectedFileData }: Props) => {

    return (
        <div>
            <Map
                css={container}
                center={{ lat: 33.44541, lng: 128.04924 }}
                level={14}
            >
                <MapInformation />
                {stage.map((st) => {
                    const { lat, lng, name } = st;
                    return (
                        <CustomOverlayMap key={name} position={{ lat, lng }}>
                            <div css={stContainer}>{name}</div>
                        </CustomOverlayMap>
                    );
                })}
                {selectedFileData.map((data: MarkerData) => {
                    return <Marker key={data["CAST#"]} {...data} />;
                })}
            </Map>
        </div>
    );
};

export default MapComponent;
