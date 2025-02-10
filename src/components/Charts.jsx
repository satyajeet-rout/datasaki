import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SurveyChart = ({ data, title = "Survey Results", colors = [] }) => {


    const aggregateData = (data) => {
        const aggregatedData = {
            numeric: {},
            categorical: {},
        };

        data.forEach((obj) => {
            Object.keys(obj).forEach((key) => {
                const value = obj[key];

                if (typeof value === "number") {
                    aggregatedData.numeric[key] = (aggregatedData.numeric[key] || 0) + value;
                }
               
                else if (typeof value === "string" || typeof value === "boolean") {
                    aggregatedData.categorical[key] = aggregatedData.categorical[key] || {};
                    aggregatedData.categorical[key][value] = (aggregatedData.categorical[key][value] || 0) + 1;
                }
            });
        });
        return aggregatedData;
    };

    const aggregatedData = aggregateData(data);

    if (
        Object.keys(aggregatedData.numeric).length === 0 &&
        Object.keys(aggregatedData.categorical).length === 0
    ) {
        return (
            <div style={{ maxWidth: "100%", margin: "auto", padding: "20px" }}>
                <p>No data available for charting.</p>
            </div>
        );
    }

    const defaultColors = [
        "#42A5F5",
        "#66BB6A",
        "#FF7043",
        "#FFEB3B",
        "#FF4081",
        "#8E24AA",
        "#FF5722",
        "#9C27B0",
        "#00BCD4",
        "#4CAF50",
        "#FFC107",
    ];


    const chartData = {
        labels: [],
        datasets: [
            {
                label: title,
                data: [],
                backgroundColor:
                    colors.length > 0
                        ? colors
                        : defaultColors.slice(0, Math.max(Object.keys(aggregatedData.numeric).length, Object.keys(aggregatedData.categorical).length)),
                borderColor: "#ffffff", 
                borderWidth: 1,
            },
        ],
    };


    Object.keys(aggregatedData.numeric).forEach((key) => {
        chartData.labels.push(key);
        chartData.datasets[0].data.push(aggregatedData.numeric[key]);
    });


    Object.keys(aggregatedData.categorical).forEach((key) => {
        Object.keys(aggregatedData.categorical[key]).forEach((value) => {
            chartData.labels.push(`${key}: ${value}`);
            chartData.datasets[0].data.push(aggregatedData.categorical[key][value]);
        });
    });


    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`; 
                    },
                },
            },
        },
    };

    return (
        <div style={{ maxWidth: "100%", margin: "auto", padding: "20px" }}>
            <Pie data={chartData} options={chartOptions} />
        </div>
    );
};

export default SurveyChart;
