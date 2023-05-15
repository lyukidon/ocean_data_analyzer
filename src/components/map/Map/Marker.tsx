/** @jsxImportSource @emotion/react */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

import { Line } from "react-chartjs-2";

import { css } from "@emotion/react";

import { CenterType } from "./MapComponent";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const detailTitle = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const detailContainer = css`
    border: 1px solid black;
    > div {
        background-color: #fff;
    }
`;
const chartSize = css`
    width: 550px;
`;

interface XType {
    T: number[];
    S: number[];
}

interface YType {
    Z: number[];
}

interface MarkerData {
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

interface Props {
    data: MarkerData;
    center: CenterType;
    setCenter: Dispatch<SetStateAction<CenterType>>;
}

const Marker: React.FC<Props> = ({ data, center, setCenter }: Props) => {
    const { LAT, LON, Z, T, S } = data;
    const cast = data["CAST#"];

    const [toggle, setToggle] = useState(false);

    const [xData, setXData] = useState<XType>({
        T: [],
        S: [],
    });
    const [yData, setYData] = useState<YType>({
        Z: [],
    });

    useEffect(() => {
        if (Z.length !== 0) {
            setYData((prev) => ({
                Z: [...Z],
            }));
        }
        if (T.length !== 0) {
            setXData((prev) => ({
                ...prev,
                T: [...T],
            }));
        }
        if (S) {
            setXData((prev) => ({
                ...prev,
                S: [...S],
            }));
        }
    }, []);

    const handleClick = () => {
        setToggle((prev) => !prev);
        setCenter((prev) => ({
            ...prev,
            lat: LAT,
            lng: LON,
        }));
    };

    return (
        <>
            {!toggle && (
                <MapMarker
                    key={cast}
                    position={{ lat: LAT, lng: LON }}
                    clickable={true}
                    onClick={handleClick}
                ></MapMarker>
            )}
            {toggle && (
                <CustomOverlayMap position={{ lat: LAT + 2, lng: LON - 1 }}>
                    <div css={detailContainer}>
                        <div css={detailTitle}>
                            <div>{`CAST:${cast}`}</div>
                            <div>
                                <button
                                    onClick={() => setToggle((prev) => !prev)}
                                >
                                    닫기
                                </button>
                            </div>
                        </div>
                        <div>Details</div>
                        <div>
                            Date:{" "}
                            {`${data["YYYY"]}.${data["MM"]}.${data["DD"]}`}
                        </div>
                        <div>Position: {`${LAT}, ${LON}`}</div>
                        <div css={chartSize}>
                            {xData.T.length !== 0 && (
                                <Line
                                    data={{
                                        labels: xData.T,
                                        datasets: [
                                            {
                                                label: "Temperature",
                                                data: yData.Z,
                                                pointRadius: 0,
                                            },
                                        ],
                                    }}
                                    options={{
                                        scales: {
                                            x: {
                                                position: "top",
                                                type: "linear",
                                            },
                                            y: {
                                                reverse: true,
                                            },
                                        },
                                        elements: {
                                            line: {
                                                borderColor: "#f00", // 선의 색상을 빨간색으로 변경
                                                borderWidth: 1, // 선의 두께를 2로 변경
                                            },
                                        },
                                    }}
                                />
                            )}
                            {xData.S.length !== 0 && (
                                <Line
                                    data={{
                                        labels: xData.S,
                                        datasets: [
                                            {
                                                label: "Salinity",
                                                data: yData.Z,
                                                pointRadius: 0,
                                            },
                                        ],
                                    }}
                                    options={{
                                        scales: {
                                            x: {
                                                position: "top",
                                                type: "linear",
                                            },
                                            y: {
                                                reverse: true,
                                                beginAtZero: true,
                                            },
                                        },
                                        elements: {
                                            line: {
                                                borderColor: "green",
                                                borderWidth: 1,
                                            },
                                        },
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </CustomOverlayMap>
            )}
        </>
    );
};

export default Marker;
