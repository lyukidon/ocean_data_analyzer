/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { css } from "@emotion/react";

import { MarkerData } from "./MapComponent";

const titleContainer = css`
    background-color: rgba(0, 0, 0, 0);
    text-align: center;
`;
const detailContainer = css`

`;

const Marker: React.FC<MarkerData> = (data: MarkerData) => {
    const lat = data.LAT;
    const lng = data.LON;
    const cast = data["CAST#"];

    const [toggle, setToggle] = useState(false);
    return (
        <MapMarker
            key={cast}
            position={{ lat, lng }}
            clickable={true}
            onClick={() => setToggle((prev) => !prev)}
        >
            <div css={titleContainer}>{`CAST:${cast}`}</div>
            {toggle && (
                <div
                    css={detailContainer}
                >{`Details ${data["YYYY"]}.${data["MM"]}.${data["DD"]}`}</div>
            )}
        </MapMarker>
    );
};

export default Marker;
