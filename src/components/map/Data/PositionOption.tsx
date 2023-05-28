/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { toggleType } from "../../../App";

const container = css`
    border: 1px solid #fff;
    border-radius: 10px;
    > div {
        margin: 15px 0px;
    }
`;

const buttonStyle = css`
    background-color: #898989;
    color: #fff;
    border: none;
    padding: 5px 8px;
    margin: 5px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #ededed;
        color: #525252;
    }
`;

const inputStyle = css`
    background-color: #ffffff;
    color: #000000;
    border: 1px solid #959595;
    padding: 3px;
`;

const optionContainer = css`
    > div {
        margin-bottom: 5px;
    }
`;

interface Props {
    fileData: any[];
    setFileData: Dispatch<SetStateAction<any[]>>;
    selectedFileData: any[];
    setSelectedFileData: Dispatch<SetStateAction<any[]>>;
    toggle: toggleType;
    setToggle: Dispatch<SetStateAction<toggleType>>;
}

interface positionType {
    lat: number[];
    lon: number[];
}

export const analyzeRange = (string: string) => {
    return string.match(/\d+/g)?.map(Number);
};

const PositionOption = ({
    fileData,
    setFileData,
    selectedFileData,
    setSelectedFileData,
    toggle,
    setToggle,
}: Props) => {
    const [position, setPosition] = useState<positionType>({
        lat: [],
        lon: [],
    });

    const [date, setDate] = useState({
        year: [],
        month: [],
        day: [],
    });

    const handlePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const pos: number[] | undefined = analyzeRange(value);
        pos
            ? setPosition((prev) => ({ ...prev, [name]: [...pos] }))
            : setPosition((prev) => ({ ...prev, [name]: [] }));
    };

    const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const date: number[] | undefined = analyzeRange(value);
        date
            ? setDate((prev) => ({ ...prev, [name]: [...date] }))
            : setDate((prev) => ({ ...prev, [name]: [] }));
    };

    const onClickPosition = (e: React.MouseEvent<HTMLButtonElement>) => {
        switch (e.currentTarget.dataset.action) {
            case "latSearch":
                const latData = fileData.filter(
                    (cur) => cur.LAT >= position.lat[0] && cur.LAT <= position.lat[1]
                );
                setSelectedFileData((prev) => [...latData]);
                break;
            case "lonSearch":
                const lonData = fileData.filter(
                    (cur) => cur.LON >= position.lon[0] && cur.LON <= position.lon[1]
                );
                setSelectedFileData((prev) => [...lonData]);
                break;
            case "search":
                const data = fileData.filter(
                    (cur) =>
                        cur.LAT >= position.lat[0] &&
                        cur.LAT <= position.lat[1] &&
                        cur.LON >= position.lon[0] &&
                        cur.LON <= position.lon[1]
                );
                setSelectedFileData((prev) => [...data]);
                break;
        }
    };

    const onClickDate = (e: React.MouseEvent<HTMLButtonElement>) => {
        switch (e.currentTarget.dataset.action) {
            case "yearSearch": {
                const filteredData = selectedFileData.filter(
                    (cur) => cur.YYYY >= date.year[0] && cur.YYYY <= date.year[1]
                );
                setSelectedFileData((prev) => [...filteredData]);
                break;
            }
            case "monthSearch": {
                const filteredData = selectedFileData.filter(
                    (cur) => cur.MM >= date.month[0] && cur.MM <= date.month[1]
                );
                setSelectedFileData((prev) => [...filteredData]);
                break;
            }
            case "daySearch": {
                const filteredData = selectedFileData.filter(
                    (cur) => cur.DD >= date.day[0] && cur.DD <= date.day[1]
                );
                setSelectedFileData((prev) => [...filteredData]);
                break;
            }
        }
    };

    return (
        <div css={container}>
            <div>
                {/* <input type="checkbox" name="position" id="" /> */}
                범위
                <div>
                    <div css={optionContainer}>
                        <div>
                            위도:{" "}
                            <input
                                placeholder={"ex) 1-38"}
                                css={inputStyle}
                                type="text"
                                name="lat"
                                onChange={handlePosition}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        css={buttonStyle}
                        type="button"
                        data-action="latSearch"
                        onClick={onClickPosition}
                    >
                        위도 검색
                    </button>
                </div>
            </div>
            <div>
                <div>
                    <div css={optionContainer}>
                        <div>
                            경도:{" "}
                            <input
                                placeholder={"ex) 121-128"}
                                css={inputStyle}
                                type="text"
                                name="lon"
                                onChange={handlePosition}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        css={buttonStyle}
                        type="button"
                        data-action="lonSearch"
                        onClick={onClickPosition}
                    >
                        경도 검색
                    </button>
                </div>
            </div>
            <div>
                <button
                    css={buttonStyle}
                    type="button"
                    data-action="search"
                    onClick={onClickPosition}
                >
                    전체 검색
                </button>
            </div>
            <div>
                <div>
                    Year: <input type="text" name="year" onChange={handleDate} placeholder="yyyy-yyyy" />
                    <button data-action="yearSearch" onClick={onClickDate}>
                        검색
                    </button>
                </div>
                <div>
                    Month: <input type="text" name="month" onChange={handleDate} placeholder="mm-mm" />
                    <button data-action="monthSearch" onClick={onClickDate}>
                        검색
                    </button>
                </div>
                <div>
                    Day: <input type="text" name="day" onChange={handleDate} placeholder="dd-dd" />
                    <button data-action="daySearch" onClick={onClickDate}>
                        검색
                    </button>
                </div>
            </div>
            <div>
                {/* <div>데이터 갯수</div> */}
            </div>
        </div>
    );
};

export default PositionOption;
