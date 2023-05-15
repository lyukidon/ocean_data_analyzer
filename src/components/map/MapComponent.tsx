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

type dateType = {
    year: number[];
    month: number[];
    day: number[];
};

type selectedDateType = {
    year: number;
    month: number;
    day: number;
};

interface positionType {
    latStart: number;
    latEnd: number;
    lonStart: number;
    lonEnd: number;
}

const MapComponent: React.FC<Props> = ({ fileData, setFileData }: Props) => {
    const [date, setDate]: [dateType, Dispatch<SetStateAction<dateType>>] =
        useState<dateType>({
            year: [],
            month: [],
            day: [],
        });

    const [selectedDate, setSelectedDate]: [
        selectedDateType,
        Dispatch<SetStateAction<selectedDateType>>
    ] = useState<selectedDateType>({
        year: 0,
        month: 0,
        day: 0,
    });

    const [selectedFileData, setSelectedFileData] = useState<any[]>([]);

    const yearFilter = () => {
        let arr: number[] = [];
        for (let i = 0; i < fileData.length; i++) {
            if (arr[arr.length - 1] !== fileData[i]["YYYY"]) {
                arr = [...arr, fileData[i]["YYYY"]];
            }
        }
        setDate((prev) => ({ ...prev, year: [0, ...arr] }));
    };

    const monthFilter = (selectedYear: number) => {
        let arr: number[] = [];
        for (let i = 0; i < fileData.length; i++) {
            if (
                selectedYear === fileData[i]["YYYY"] &&
                arr[arr.length - 1] !== fileData[i]["MM"]
            ) {
                arr = [...arr, fileData[i]["MM"]];
            }
        }
        setDate((prev) => ({ ...prev, month: [0, ...arr] }));
    };

    const dayFilter = (selectedMonth: number) => {
        let arr: number[] = [];
        for (let i = 0; i < fileData.length; i++) {
            if (
                selectedDate.year === fileData[i]["YYYY"] &&
                selectedMonth === fileData[i]["MM"] &&
                arr[arr.length - 1] !== fileData[i]["DD"]
            ) {
                arr = [...arr, fileData[i]["DD"]];
            }
        }
        setDate((prev) => ({ ...prev, day: [0, ...arr] }));
    };

    useEffect(() => {
        yearFilter();
    }, [fileData]);

    const onChangeDate = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = e.target;
        if (name === "year") {
            monthFilter(+value);
            setDate((prev) => ({ ...prev, day: [] }));
            setSelectedDate((prev) => ({
                ...prev,
                [name]: +value,
                month: 0,
                day: 0,
            }));
        } else if (name === "month") {
            dayFilter(+value);
            setSelectedDate((prev) => ({ ...prev, [name]: +value, day: 0 }));
        } else {
            setSelectedDate((prev) => ({ ...prev, [name]: +value }));
        }
    };

    useEffect(() => {
        const { year, month, day } = selectedDate;
        if (year !== 0 && month !== 0 && day !== 0) {
            const data = fileData.filter(
                (cur) =>
                    cur["YYYY"] === year &&
                    cur["MM"] === month &&
                    cur["DD"] === day
            );
            setSelectedFileData((prev) => [...data]);
        }
    }, [selectedDate]);

    const [position, setPosition] = useState<positionType>({
        latStart: 0,
        latEnd: 0,
        lonStart: 0,
        lonEnd: 0,
    });

    const onChangePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log({ [name]: value });
        setPosition((prev) => ({ ...prev, [name]: value }));
    };

    const onClickPosition = (e: React.MouseEvent<HTMLButtonElement>) => {
        switch (e.currentTarget.dataset.action) {
            case "latSearch":
                const latData = fileData.filter(
                    (cur) =>
                        cur.LAT >= position.latStart &&
                        cur.LAT <= position.latEnd
                );
                setSelectedFileData((prev) => [...latData]);
                break;
            case "lonSearch":
                const lonData = fileData.filter(
                    (cur) =>
                        cur.LON >= position.lonStart &&
                        cur.LON <= position.lonEnd
                );
                setSelectedFileData((prev) => [...lonData]);
                break;
            case "search":
                const data = fileData.filter(
                    (cur) =>
                        cur.LAT >= position.latStart &&
                        cur.LAT <= position.latEnd &&
                        cur.LON >= position.lonStart &&
                        cur.LON <= position.lonEnd
                );
                setSelectedFileData((prev) => [...data]);
                break;
        }
        const data = fileData.filter;
    };

    return (
        <div>
            <div>
                <select name="year" onChange={onChangeDate}>
                    {date.year.map((num) => (
                        <option>{num}</option>
                    ))}
                </select>
                <select name="month" onChange={onChangeDate}>
                    {date.month.map((num) => (
                        <option>{num}</option>
                    ))}
                </select>
                <select name="day" onChange={onChangeDate}>
                    {date.day.map((num) => (
                        <option>{num}</option>
                    ))}
                </select>
            </div>
            <div>
                <div>
                    위도 시작:{" "}
                    <input
                        type="text"
                        name="latStart"
                        onChange={onChangePosition}
                    />
                    위도 끝:{" "}
                    <input
                        type="text"
                        name="latEnd"
                        onChange={onChangePosition}
                    />
                    <button
                        type="button"
                        data-action="latSearch"
                        onClick={onClickPosition}
                    >
                        위도 검색
                    </button>
                </div>
                <div>
                    경도 시작:{" "}
                    <input
                        type="text"
                        name="lonStart"
                        onChange={onChangePosition}
                    />
                    경도 끝:{" "}
                    <input
                        type="text"
                        name="lonEnd"
                        onChange={onChangePosition}
                    />
                    <button
                        type="button"
                        data-action="lonSearch"
                        onClick={onClickPosition}
                    >
                        경도 검색
                    </button>
                </div>
                <button
                    type="button"
                    data-action="search"
                    onClick={onClickPosition}
                >
                    전체 검색
                </button>
            </div>

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
