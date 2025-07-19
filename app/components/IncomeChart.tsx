"use client"

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card,  CardContent,  CardDescription,  CardFooter,  CardHeader,  CardTitle, } from "@/components/ui/card";
import { ChartConfig,  ChartContainer,  ChartTooltip,  ChartTooltipContent, } from "@/components/ui/chart";
import axios from "axios";

interface Incomes {
    prihod: number
}

export function IncomeChart() {
    const [incomes, setIncomes] = useState<Incomes[]>([]);

    useEffect(() => {
        async function getIncomes() {
            try {
                const res = await axios.get("/api/get-incomes");
                setIncomes(res.data.incomes)
            } catch (error) {
                console.log(error);
            }
        }
        getIncomes();
    }, []);

    const chartData = incomes.length > 0 ? [
        { month: "Januar", desktop: incomes[0]?.prihod || 0 },
        { month: "Februar", desktop: incomes[1]?.prihod || 0 },
        { month: "Mart", desktop: incomes[2]?.prihod || 0 },
        { month: "April", desktop: incomes[3]?.prihod || 0 },
        { month: "Maj", desktop: incomes[4]?.prihod || 0 },
        { month: "Jun", desktop: incomes[5]?.prihod || 0 },
        { month: "Jul", desktop: incomes[6]?.prihod || 0 },
        { month: "Avgust", desktop: incomes[7]?.prihod || 0 },
        { month: "Septembar", desktop: incomes[8]?.prihod || 0 },
        { month: "Oktobar", desktop: incomes[9]?.prihod || 0 },
        { month: "Novembar", desktop: incomes[10]?.prihod || 0 },
        { month: "Decembar", desktop: incomes[11]?.prihod || 0 },
    ] : [];

    const chartConfig = {
        desktop: {
            label: "Prihod",
            color: "var(--chart-5)",
        }
    } satisfies ChartConfig
    return (
        <Card>
            <CardHeader>
                <CardTitle>Godišnji prihodi</CardTitle>
                <CardDescription>
                    Prikazuje prihode u 2025. godini
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="url(#fillDesktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Januar - Decembar 2025
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
