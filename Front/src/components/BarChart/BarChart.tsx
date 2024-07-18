
"use client";

import { useEffect, useRef, RefObject, useState } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import { userSession } from "@/types";
import { getTotalDentist, getTotalPatient, getTotalSuperAdmin, getTotalAdministrative } from "@/helpers/patients.helper";

Chart.register(...registerables);

interface TotalUsers {
    total: number;
    active: number;
    inactive: number;
}

function BarChart() {
    const [userData, setUserData] = useState<userSession | null>(null);
    const [totalPatients, setTotalPatients] = useState<TotalUsers | null>(null);
    const [totalDentists, setTotalDentists] = useState<TotalUsers | null>(null);
    const [totalAdmins, setTotalAdmins] = useState<TotalUsers | null>(null);
    const [totalSuperAdmins, setTotalSuperAdmins] = useState<TotalUsers | null>(null);

    const chartRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const userData = localStorage.getItem('userSession');
            setUserData(userData ? JSON.parse(userData) : null);
        }

        const fetchData = async () => {
            const totalPatient = await getTotalPatient();
            setTotalPatients(totalPatient);
            const totalDentist = await getTotalDentist();
            setTotalDentists(totalDentist);
            const totalAdmin = await getTotalAdministrative();
            setTotalAdmins(totalAdmin);
            const totalSuperAdmin = await getTotalSuperAdmin();
            setTotalSuperAdmins(totalSuperAdmin);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartRef.current && totalPatients && totalDentists && totalAdmins && totalSuperAdmins) {
            if ((chartRef.current as any).chart) {
                (chartRef.current as any).chart.destroy();
            }

            const context = chartRef.current?.getContext("2d");
            if (context) {
                const backgroundColorPlugin = {
                    id: 'customCanvasBackgroundColor',
                    beforeDraw: (chart: any) => {
                        const { ctx } = chart;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = '#1D1D1D';
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                    }
                };

                const config: ChartConfiguration<'bar'> = {
                    type: "bar",
                    data: {
                        labels: ["Pacientes", "Dentistas", "Administrativos", "SuperAdmins"],
                        datasets: [{
                            label: "cantidad",
                            data: [totalPatients.total, totalDentists.total, totalAdmins.total, totalSuperAdmins.total],
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.7)",
                                "rgba(255, 159, 64, 0.7)",
                                "rgba(25, 205, 86, 0.7)",
                                "rgba(54, 162, 235, 0.7)"
                            ],
                            borderColor: [
                                "rgb(255, 99, 132)",
                                "rgb(255, 159, 64)",
                                "rgb(25, 205, 86)",
                                "rgb(54, 162, 235)"
                            ],
                            borderWidth: 1,
                            barThickness: 40,
                        }],
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                type: "category",
                            },
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: "rgba(255, 255, 255, 0.1)",
                                },
                            },
                        },
                        plugins: {
                            legend: {
                                display: false,
                                labels: {
                                    color: "white",
                                    font: {
                                        weight: "bold",
                                    },
                                },
                            },
                            title: {
                                display: true,
                                text: "Resumen Estadístico",
                                font: {
                                    size: 18,
                                    weight: "bold",
                                },
                            },
                        },
                    },
                    plugins: [backgroundColorPlugin],
                };

                const newChart = new Chart(context, config);
                (chartRef.current as any).chart = newChart;
            }
        }
    }, [totalPatients, totalDentists, totalAdmins, totalSuperAdmins]);

    return (
        <div className="relative w-[90%] h-auto mt-10">
            <canvas ref={chartRef} className="rounded-xl" />
        </div>
    );
}

export default BarChart;
