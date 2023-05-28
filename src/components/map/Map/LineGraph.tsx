import React from "react";
import { Line } from "react-chartjs-2";

interface Props {
    labels: number[]; // x
    data: {
        label: string;
        data: number[]; // y
        pointRadius: number;
    }[];
}

const LineGraph: React.FC<Props> = ({ labels, data }: Props) => {
    return (
        <Line
            data={{ labels, datasets: data }}
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
                        borderWidth: 1,
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
            }}
        />
    );
};

export default LineGraph;
