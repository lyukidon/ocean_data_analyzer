import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
    fileData: any[];
    setFileData: Dispatch<SetStateAction<any[]>>;
    selectedFileData: any[];
    setSelectedFileData: Dispatch<SetStateAction<any[]>>;
}

interface positionType {
    latStart: number;
    latEnd: number;
    lonStart: number;
    lonEnd: number;
}

const PositionOption = ({
    fileData,
    setFileData,
    selectedFileData,
    setSelectedFileData,
}: Props) => {
    const [position, setPosition] = useState<positionType>({
        latStart: 0,
        latEnd: 0,
        lonStart: 0,
        lonEnd: 0,
    });

    const onChangePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
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
        <>
            <div>
                <div>
                    <div>
                        위도 시작:{" "}
                        <input
                            type="text"
                            name="latStart"
                            onChange={onChangePosition}
                        />
                    </div>
                    <div>
                        위도 끝:{" "}
                        <input
                            type="text"
                            name="latEnd"
                            onChange={onChangePosition}
                        />
                    </div>
                </div>
                <div>
                    <button
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
                    <div>
                        경도 시작:{" "}
                        <input
                            type="text"
                            name="lonStart"
                            onChange={onChangePosition}
                        />
                    </div>
                    <div>
                        경도 끝:{" "}
                        <input
                            type="text"
                            name="lonEnd"
                            onChange={onChangePosition}
                        />
                    </div>
                </div>
                <div>
                    <button
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
                    type="button"
                    data-action="search"
                    onClick={onClickPosition}
                >
                    전체 검색
                </button>
            </div>
        </>
    );
};

export default PositionOption;
