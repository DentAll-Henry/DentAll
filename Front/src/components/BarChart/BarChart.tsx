"use client";
import { useEffect, useRef, RefObject } from "react";
import { Chart, ChartConfiguration } from "chart.js/auto";

function BarChart() {
    const chartRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            if ((chartRef.current as any).chart) {
                (chartRef.current as any).chart.destroy();
            }

            const context = chartRef.current?.getContext("2d");
            if (context) {
                const config: ChartConfiguration<'bar'> = {
                    type: "bar",
                    data: {
                        labels: ["Pacientes", "Dentistas", "Administrativos", "Citas"],
                        datasets: [{
                            label: "cantidad",
                            data: [4, 4, 3, 2],
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.7)",
                                "rgba(255, 159, 64, 0.7)",
                                "rgba(255, 205, 86, 0.7)",
                                "rgba(255, 1, 86, 0.7)",
                            ],
                            borderColor: [
                                "rgb(255, 99, 132)",
                                "rgb(255, 159, 64)",
                                "rgb(255, 205, 86)",
                                "rgb(255, 1, 86)",
                            ],
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                type: "category",
                                // ticks: {
                                //     color: "white", // Color de las etiquetas del eje x
                                //     font: {
                                //         weight: "bold", // Texto en negrita
                                //     },
                                // },
                            },
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: "rgba(255, 255, 255, 0.1)", // Color blanco para las líneas horizontales
                                },
                                // ticks: {
                                //     color: "white", // Color de las etiquetas del eje y
                                //     font: {
                                //         weight: "bold", // Texto en negrita
                                //     },
                                // },
                            },
                        },
                        plugins: {
                            legend: {
                                display: false, // Ocultar la leyenda
                                labels: {
                                    color: "white", // Color del texto de la leyenda
                                    font: {
                                        weight: "bold", // Texto en negrita
                                    },
                                },
                            },
                            title: {
                                display: true,
                                text: "Resumen Estadístico",
                                color: "white", // Color del texto del título
                                font: {
                                    size: 18, // Tamaño del texto del título
                                    weight: "bold", // Texto en negrita
                                },
                            },
                        },
                        datasets: {
                            bar: {
                                barThickness: 40, // Ajusta el valor para hacer las barras más delgadas o gruesas
                            },
                        },
                    },
                };

                const newChart = new Chart(context, config);
                (chartRef.current as any).chart = newChart;
            }
        }
    }, []);

    return (
        <div className="relative w-[80%] h-auto">
            <canvas ref={chartRef} />
        </div>
    );
}

export default BarChart;
