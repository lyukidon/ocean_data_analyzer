import React, { useEffect, useState } from "react";
import { CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";

const MapInformation = () => {
    const [lngLine, setLngLine] = useState<any[]>([]);
    const lngMaker = () => {
        let arr: any[] = [];
        for (let i = 0; i < 15; i++) {
            arr = [
                ...arr,
                [
                    { lat: 32, lng: 135 - i },
                    { lat: 37, lng: 135 - i },
                ],
            ];
        }
        setLngLine((prev) => [...arr]);
    };
    const [latLine, setLatLine] = useState<any[]>([]);
    const latMaker = () => {
        let arr: any[] = [];
        for (let i = 0; i < 5; i++) {
            arr = [
                ...arr,
                [
                    { lat: 36 - i, lng: 136 },
                    { lat: 36 - i, lng: 135 },
                    { lat: 36 - i, lng: 134 },
                    { lat: 36 - i, lng: 133 },
                    { lat: 36 - i, lng: 132 },
                    { lat: 36 - i, lng: 131 },
                    { lat: 36 - i, lng: 130 },
                    { lat: 36 - i, lng: 129 },
                    { lat: 36 - i, lng: 128 },
                    { lat: 36 - i, lng: 127 },
                    { lat: 36 - i, lng: 126 },
                    { lat: 36 - i, lng: 125 },
                    { lat: 36 - i, lng: 123 },
                    { lat: 36 - i, lng: 122 },
                    { lat: 36 - i, lng: 121 },
                    { lat: 36 - i, lng: 120 },
                ],
            ];
        }
        setLatLine((prev) => [...arr]);
    }

    useEffect(() => {
        lngMaker();
        latMaker();
    }, []);

    return (
        <div>
            {/* 위도 */}
            <Polyline
                path={latLine}
                strokeWeight={2} // 선의 두께 입니다
                strokeColor={"#FFAE00"} // 선의 색깔입니다
                strokeOpacity={0.5} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle={"solid"} // 선의 스타일입니다
            />
            {latLine.map((cur) => (
                <CustomOverlayMap
                    position={{ lat: cur[1].lat, lng: cur[0].lng }}
                >
                    <div>{cur[1].lat}</div>
                </CustomOverlayMap>
            ))}
            {/* 경도 */}
            <Polyline
                path={lngLine}
                strokeWeight={2} // 선의 두께 입니다
                strokeColor={"#FFAE00"} // 선의 색깔입니다
                strokeOpacity={0.5} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle={"solid"} // 선의 스타일입니다
            />
            {lngLine.map((cur) => (
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
