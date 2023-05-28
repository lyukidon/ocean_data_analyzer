/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

import { toggleType } from "../../../App";

const container = css`
    border: 1px solid #fff;
    border-radius: 10px;
    > select {
        margin-right: 5px;
        padding: 2px;
        background-color: rgba(0, 0, 0, 0);
        color: #fff;
        border: 1px solid #fff;
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

type dateType = {
    year: number[];
    month: number[];
    day: number[];
};

export interface selectedDateType {
    year: number;
    month: number;
    day: number;
}

const DateOption = ({
    fileData,
    setFileData,
    selectedFileData,
    setSelectedFileData,
    toggle,
    setToggle,
}: Props) => {
    const [date, setDate]: [dateType, Dispatch<SetStateAction<dateType>>] = useState<dateType>({
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
            if (selectedYear === fileData[i]["YYYY"] && arr[arr.length - 1] !== fileData[i]["MM"]) {
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
                (cur) => cur["YYYY"] === year && cur["MM"] === month && cur["DD"] === day
            );
            setSelectedFileData((prev) => [...data]);
        }
    }, [selectedDate]);

    return (
        <div css={container}>
            {/* <div><input type="checkbox" name="date" id="" />날짜</div> */}
            <div>날짜</div>
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
    );
};

export default DateOption;
