"use client"

import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { Card,  CardContent,  CardDescription,  CardFooter,  CardHeader,  CardTitle, } from "@/components/ui/card";
import { ChartConfig,  ChartContainer,  ChartTooltip,  ChartTooltipContent, } from "@/components/ui/chart";
import axios from "axios";

export function ProjectsPieChart() {
    const [totalProjects, setTotalProjects] = useState<number>();
    const [finishedProjects, setFinishedProjects] = useState<number>();
    const [unFinishedProjects, setUnFinishedProjects] = useState<number>();

    useEffect(() => {
        async function getChartDetails() {
            try {
                const res = await axios.get("/api/get-finished-unfinished-projects");
                console.log(res.data);
                setTotalProjects(res.data.projectsCount[0].count);
                setFinishedProjects(res.data.finishedCount[0].finished);
                setUnFinishedProjects(res.data.unfinishedCount[0].unfinished);
            } catch (error) {
                console.log(error);
            }
        }
        getChartDetails();
    }, []);

    const chartConfig = {
        visitors: {
            label: "Visitors",
        },
        safari: {
            label: "Završeni",
            color: "var(--chart-2)",
        },
        other: {
            label: "Nezavršeni",
            color: "var(--chart-5)",
        },
    } satisfies ChartConfig;

    const chartData = [
        { browser: "Završeni", visitors: finishedProjects, fill: "var(--color-safari)" },
        { browser: "Nezavršeni", visitors: unFinishedProjects, fill: "var(--color-other)" },
    ];
    return (
        <Card className="flex flex-col h-full w-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Završeni i nezavršeni projekti</CardTitle>
                <CardDescription>Godina 2025.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />}/>
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalProjects}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Projekata
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="text-muted-foreground leading-none">
                    Prikazuje sve projekte koji su do danas napravljeni
                </div>
            </CardFooter>
        </Card>
    )
}