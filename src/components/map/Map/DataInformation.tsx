/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { FaTimes } from "react-icons/fa";
import LineGraph from "./LineGraph";

import { toggleType } from "../../../App";
import { analyzeRange } from "../Data/PositionOption";

interface DetailsProps {
    cast: number;
    YYYY: number;
    MM: number;
    DD: number;
    Z: number[];
}

const DataDetails: React.FC<DetailsProps> = ({ cast, YYYY, MM, DD, Z }: DetailsProps) => {
    return (
        <div>
            <div>cast: {cast}</div>
            <div>Date: {`${YYYY}.${MM}.${DD}`}</div>
            <div>Z: {Z.length}</div>
        </div>
    );
};

interface meanDataType {
    salinity: {
        Z: number[];
        data: number[];
    };
    temperature: {
        Z: number[];
        data: number[];
    };
}

interface Props {
    selectedFileData: any[];
    setSelectedFileData: Dispatch<SetStateAction<any[]>>;
    setToggle: Dispatch<SetStateAction<toggleType>>;
    handleToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DataInformation: React.FC<Props> = ({
    selectedFileData,
    setSelectedFileData,
    setToggle,
    handleToggle,
}: Props) => {
    const container = css`
        position: absolute;
        width: 70%;
        z-index: 9999;
        background-color: #fff;
        display: flex;
        flex-direction: column;
    `;
    const topContainer = css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `;
    const dataContainer = css`
        height: 100vh;
        overflow-y: scroll;
        > div {
            border: 1px solid black;
            margin: 10px 0;
        }
    `;
    const graphContainer = css`
        display: flex;
        flex-direction: row;
        > div {
            width: 50%;
            height: 80vh;
        }
    `;

    const sortData = (e: React.MouseEvent<HTMLButtonElement>) => {
        switch (e.currentTarget.dataset.action) {
            case "CASTsort":
                setSelectedFileData((prev: any[]): any[] => {
                    const castSorted = prev.sort((a, b) => a["CAST#"] - b["CAST#"]);
                    return [...castSorted];
                });
                break;
            case "Zsort":
                setSelectedFileData((prev: any[]): any[] => {
                    const castSorted = prev.sort((a, b) => b.Z.length - a.Z.length);
                    return [...castSorted];
                });
                break;
            case "graph":
        }
    };

    const [graphToggle, setGraphToggle] = useState(false);
    const [meanData, setMeanData]: [meanDataType, Dispatch<SetStateAction<meanDataType>>] =
        useState<meanDataType>({
            salinity: {
                Z: [],
                data: [],
            },
            temperature: {
                Z: [],
                data: [],
            },
        });

    useEffect(() => {
        if (graphToggle) {
            // 높이에 따른 salinity와 temperature 분류
            let z: number[] = [];
            const salinity: any = {};
            const temperature: any = {};
            for (let i = 0; i < selectedFileData.length; i++) {
                const { Z, S, T } = selectedFileData[i];
                if (S !== undefined) {
                    // salinity 값이 있을 때
                    for (let j = 0; j < Z.length; j++) {
                        // salinity
                        if (salinity[Z[j]]) {
                            salinity[Z[j]] = [...salinity[Z[j]], S[j]];
                            temperature[Z[j]] = [...temperature[Z[j]], T[j]];
                        } else {
                            salinity[Z[j]] = [S[j]];
                            temperature[Z[j]] = [T[j]];
                        }
                        z = [...z, Z[j]];
                    }
                } else {
                    // salinity 값이 X
                    for (let j = 0; j < Z.length; j++) {
                        // salinity
                        if (temperature[Z[j]]) {
                            temperature[Z[j]] = [...temperature[Z[j]], T[j]];
                        } else {
                            temperature[Z[j]] = [T[j]];
                        }
                        z = [...z, Z[j]];
                    }
                }
            }
            // 분류한 salinity와 temperature를 평균내기
            const _z = Array.from(new Set(z.sort((a,b)=> b-a)));
            let sum_array_salinity: number[] = [];
            let sum_array_temperature: number[] = [];
            let z_array_salinity: number[] = [];
            let z_array_temperature: number[] = [];
            for (let i = 0; i < _z.length; i++) {
                // salinity
                if (salinity[_z[i]]) {
                    const sum_salinity = salinity[_z[i]].reduce((a: number, b: number) => a + b, 0);
                    const mean_salinity = sum_salinity / salinity[_z[i]].length;
                    sum_array_salinity = [...sum_array_salinity, mean_salinity];
                    z_array_salinity = [...z_array_salinity, _z[i]];
                }
                if (temperature[_z[i]]) {
                    // temperature
                    const sum_temperature = temperature[_z[i]].reduce(
                        (a: number, b: number) => a + b,
                        0
                    );
                    const mean_temperature = sum_temperature / temperature[_z[i]].length;
                    sum_array_temperature = [...sum_array_temperature, mean_temperature];
                    z_array_temperature = [...z_array_temperature, _z[i]];
                }
            }
            const _z_num = _z.map((c) => +c);
            setMeanData({
                salinity: {
                    Z: z_array_salinity,
                    data: sum_array_salinity,
                },
                temperature: {
                    Z: z_array_temperature,
                    data: sum_array_temperature,
                },
            });
        }
    }, [graphToggle]);
    useEffect(() => console.log(meanData), [meanData]);

    return (
        <div css={container}>
            <div css={topContainer}>
                <div>데이터 정보</div>
                <button data-action="informationContainer" onClick={handleToggle}>
                    <FaTimes />
                </button>
            </div>
            <div css={dataContainer}>
                <div>Number of Data: {selectedFileData.length}</div>
                <div>
                    Date:{" "}
                    {`${selectedFileData[0].YYYY}.${selectedFileData[0].MM}.${selectedFileData[0].DD}`}{" "}
                    -{" "}
                    {`${selectedFileData[selectedFileData.length - 1].YYYY}.${
                        selectedFileData[selectedFileData.length - 1].MM
                    }.${selectedFileData[selectedFileData.length - 1].DD}`}
                </div>
                <div>
                    <button data-action="CASTsort" onClick={sortData}>
                        CAST
                    </button>
                    <button data-action="Zsort" onClick={sortData}>
                        Z Data
                    </button>
                    <button
                        data-action="graph"
                        onClick={() => {
                            setGraphToggle((prev) => !prev);
                        }}
                    >
                        Graph
                    </button>
                </div>
                {/* mean graph */}
                {graphToggle && (
                    <div css={graphContainer}>
                        <div>
                            <LineGraph
                                labels={meanData.temperature.data}
                                data={[
                                    {
                                        label: "temperature",
                                        data: meanData.temperature.Z,
                                        pointRadius: 1,
                                    },
                                ]}
                            />
                        </div>
                        <div>
                            <LineGraph
                                labels={meanData.salinity.data}
                                data={[
                                    {
                                        label: "salinity",
                                        data: meanData.salinity.Z,
                                        pointRadius: 1,
                                    },
                                ]}
                            />
                        </div>
                    </div>
                )}
                {selectedFileData.map((cur) => {
                    const { YYYY, MM, DD, Z, T, S } = cur;
                    const cast = cur["CAST#"];
                    return <DataDetails cast={cast} YYYY={YYYY} MM={MM} DD={DD} Z={Z} />;
                })}
            </div>
        </div>
    );
};

export default DataInformation;
