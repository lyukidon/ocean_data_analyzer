/** @jsxImportSource @emotion/react */

import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useCallback,
    useState,
} from "react";

import { css } from "@emotion/react";

const menuContainer = css`
    position: fixed;
    top: 0;
    left: 0;
`;

interface Props {
    fileData: any[];
    setFileData: Dispatch<SetStateAction<any[]>>;
}

interface dataType {
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

const DataAnalyzerComp: React.FC<Props> = ({ fileData, setFileData }: Props) => {
    const [file, setFile] = useState<any>();

    const dataGetter = async (
        event: React.ChangeEvent<HTMLInputElement>
    ): Promise<any> => {
        if (event !== null) {
            setFileData([]);
            const inputFile = event.target.files ? event.target.files[0] : null;

            const readFile = (inputFile: any) =>
                new Promise((res, req) => {
                    const reader = new FileReader();
                    reader.onload = (e) => res(reader.result);

                    reader.readAsText(inputFile);
                });

            if (inputFile !== null) {
                if (inputFile.type === "text/csv") {
                    let csvText = await readFile(inputFile);
                    setFile(csvText);
                } else {
                    let jsonFile = (await readFile(inputFile)) as string;
                    let data = JSON.parse(jsonFile) as any[];
                    setFileData([...data]);
                }
            }
        }
    };

    const dataSplitter = useCallback(
        (file: any | null): any => {
            if (file !== undefined) {
                const lineBreak = file.split(/\r?\n/);
                const removeSpace = lineBreak.map((data: string) =>
                    data.match(/\S+/g)
                );
                return removeSpace;
            }
        },
        [file]
    );

    const dataAnalyzer = useCallback(
        (splittedData: any[]): void => {
            if (splittedData !== undefined) {
                let arr: any[] = [];
                let obj: any = {};
                let cast = 1;
                for (let i = 1; i < splittedData.length - 1; i++) {
                    console.log(i);
                    // 0 : head, last: null
                    if (i === splittedData.length - 2) {
                        // last turn: push obj in arr
                        for (let j = 0; j < splittedData[i].length; j++) {
                            const title = splittedData[0][j];
                            const data = splittedData[i][j];
                            if (
                                title === "Z" ||
                                title === "T" ||
                                title === "S"
                            ) {
                                obj[title].push(+data);
                            }
                        }
                        arr.push(obj);
                    } else if (splittedData[i][0] !== cast) {
                        // turn that cast is changed
                        cast = splittedData[i][0];
                        arr.push(obj);
                        obj = {};
                        for (let j = 0; j < splittedData[i].length; j++) {
                            const title = splittedData[0][j];
                            const data = splittedData[i][j];
                            if (
                                title === "Z" ||
                                title === "T" ||
                                title === "S"
                            ) {
                                obj = { ...obj, [title]: [+data] };
                            } else {
                                obj = { ...obj, [title]: +data };
                            }
                        }
                    } else {
                        try {
                            for (let j = 0; j < splittedData[i].length; j++) {
                                const title = splittedData[0][j];
                                const data = splittedData[i][j];
                                if (
                                    title === "Z" ||
                                    title === "T" ||
                                    title === "S"
                                ) {
                                    obj[title] = [...obj[title], +data];
                                }
                            }
                        } catch (err) {
                            console.error(err);
                        }
                    }
                }
                setFileData([...arr]);
            }
        },
        [file]
    );

    useEffect(() => {
        const func = async (): Promise<any> => {
            const arr = await dataSplitter(file);
            await dataAnalyzer(arr);
        };
        func();
    }, [file]);

    return (
        <div>
            <div>
                <input
                    type="file"
                    accept="application/json, text/csv"
                    onChange={dataGetter}
                />
            </div>
        </div>
    );
};

export default DataAnalyzerComp;
