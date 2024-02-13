import {cn} from "@/lib/utils.ts";
import {useMotionValue, useSpring} from "framer-motion";
import {useEffect, useState} from "react";


export const PercentageCounter = ({percentage, caption}: { percentage: number, caption: string }) => {
    const bars = Array(50).fill("");
    const times = 360 / bars.length
    const size = 100;
    const yellowThreshold = 75
    const redThreshold = 45
    const [current, setCurrent] = useState<number>(0)

    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
    })

    useEffect(() => {
        motionValue.set(percentage)
    }, [motionValue, percentage]);

    useEffect(() => {
        springValue.on("change", latest => {
            setCurrent(latest.toFixed(0))
        })
    }, [percentage, springValue])

    const getColor = (i: number): string => {
        const iPercentage = i * 2;
        if (current <= iPercentage) {
            return "bg-gray-200";
        } else if (iPercentage < redThreshold) {
            return "bg-red-400";
        } else if (iPercentage < yellowThreshold) {
            return "bg-amber-400";
        } else if (iPercentage < percentage) {
            return "bg-green-400";
        }

        return "bg-gray-200";
    }
    return (
        <>
            <div className={"relative"}>
                <div className={"-rotate-90"} style={{height: `${size}px`, width: `${size}px`}}>
                    <div
                        className={'relative top-1/2 left-1/2'}
                        style={{height: `${size}px`, width: `${size}px`}}>
                        {bars.map((_, i) => (
                            <div
                                data-index={i}
                                key={i}
                                className={cn(
                                    getColor(i),
                                    'rounded-full absolute h-[8%] -left-[10%] -top-[3.9%] w-[30%] animate-spinner-loading-bar'
                                )}
                                style={{
                                    transform: `rotate(${(i) * times}deg) translate(400%)`,
                                }}></div>
                        ))}
                    </div>
                </div>
                <div className={"absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}>
                    <p className={" text-primary font-semibold text-5xl"}>{current}%</p>
                    <p className={"text-sm text-center text-muted-foreground"}>{caption}</p>
                </div>
            </div>
        </>
    )
}