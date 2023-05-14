import React, { useEffect, useState } from "react";
import { CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";

const MapInformation = () => {
    const [path, setPath] = useState<any[]>([]);
    const pathMaker = () => {
        let arr: any[] = [];
        for (let i = 0; i < 15; i++) {
            arr = [
                ...arr,
                [
                    { lat: 32, lng: 135 - i },
                    { lat: 36, lng: 135 - i },
                ],
            ];
        }
        setPath((prev) => [...arr]);
    };
    useEffect(() => {
        pathMaker();
        console.log(path);
    }, []);

    return (
        <div>
            <Polyline
                path={path}
                strokeWeight={2} // 선의 두께 입니다
                strokeColor={"#FFAE00"} // 선의 색깔입니다
                strokeOpacity={0.5} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle={"solid"} // 선의 스타일입니다
            />
            {path.map((cur) => (
                <CustomOverlayMap
                    position={{ lat: cur[1].lat, lng: cur[1].lng }}
                >
                    <div>{cur[1].lng}</div>
                </CustomOverlayMap>
            ))}
        </div>
    );
};

export default MapInformation;
