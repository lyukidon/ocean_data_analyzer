/** @jsxImportSource @emotion/react */
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { css } from "@emotion/react";

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

type dateType = {
    year:number[];
    month: number[];
    day: number[];
}

type selectedDateType = {
    year:number,
    month:number,
    day:number
}

const MapComponent: React.FC<Props> = ({ fileData, setFileData }: Props) => {
    const [date, setDate]:[dateType, Dispatch<SetStateAction<dateType>>] = useState<dateType>({
        year:[],
        month:[],
        day:[]
    })

    const [selectedDate, setSelectedDate]:[selectedDateType, Dispatch<SetStateAction<selectedDateType>>] = useState<selectedDateType>({
        year:0,
        month:0,
        day:0
    })

    const [selectedFileData, setSelectedFileData] = useState<any[]>([])

    const yearFilter = () => {
        let arr : number[] = [];
        for(let i=0;i<fileData.length;i++){
            
            if (arr[arr.length - 1] !== fileData[i]['YYYY']){
                arr = [...arr, fileData[i]['YYYY']]
            }
        }
        setDate(prev => ({...prev, year:[0 , ...arr]}))
    }

    const monthFilter = (selectedYear : number) => {
        let arr : number[] = [];
        for(let i=0;i<fileData.length;i++){
            
            if (selectedYear === fileData[i]['YYYY'] && arr[arr.length - 1] !== fileData[i]['MM']){
                arr = [...arr, fileData[i]['MM']]
            }
        }
        setDate(prev => ({...prev, month:[0 , ...arr]}))
    }

    const dayFilter = (selectedMonth : number) => {
        let arr : number[] = [];
        for(let i=0;i<fileData.length;i++){
            
            if (selectedDate.year === fileData[i]['YYYY'] && selectedMonth === fileData[i]['MM'] && arr[arr.length - 1] !== fileData[i]['DD']){
                arr = [...arr, fileData[i]['DD']]
            }
        }
        setDate(prev => ({...prev, day:[0 , ...arr]}))
    }

    useEffect(()=>{
        yearFilter();
    },[fileData])

    const onChange = (e:React.ChangeEvent<HTMLSelectElement>) : void => {
        const {name, value} = e.target;
        if (name === 'year'){
            console.log('year')
            monthFilter(+value);
            setDate(prev => ({...prev, day:[]}))
            setSelectedDate(prev => ({...prev, [name]: +value, month:0, day:0}))
        }else if(name === 'month'){
            console.log('month')
            dayFilter(+value);
            setSelectedDate(prev => ({...prev, [name]: +value,day:0}))
        }else{
            console.log('day')
            setSelectedDate(prev => ({...prev, [name]: +value}))
        }
    }

    useEffect(()=>{
        const {year, month, day} = selectedDate;
        if (year !== 0 && month !== 0 && day !== 0){
            const data = fileData.filter( cur => cur["YYYY"] === year && cur["MM"] === month && cur["DD"] === day);
            setSelectedFileData(prev => [...data])
        }
    },[selectedDate])

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div>
            <select name="year" onChange={onChange}>
                {
                    date.year.map( num => (<option>{num}</option>))
                }
            </select>
            <select name="month" onChange={onChange}>
                {
                    date.month.map( num => (<option>{num}</option>))
                }
            </select>
            <select name="day" onChange={onChange}>
                {
                    date.day.map( num => (<option>{num}</option>))
                }
            </select>

            <Map
                css={container}
                center={{ lat: 33.44541, lng: 128.04924 }}
                level={12}
            >
                {stage.map((st) => {
                    const { lat, lng, name } = st;
                    return (
                        <MapMarker key={name} position={{ lat, lng }}>
                            <div>{name}</div>
                        </MapMarker>
                    );
                })}
                {
                    selectedFileData.map((st) => {
                        const lat = st.LAT;
                        const lng = st.LON;
                        const cast = st['CAST#']
                        return (
                            <MapMarker key={cast} position={{ lat, lng }} clickable onClick={()=>console.log('hi')}>
                                <div>{`CAST:${cast}`}</div>
                            </MapMarker>
                        )
                    })
                }
                
            </Map>
        </div>
    );
};

export default MapComponent;
