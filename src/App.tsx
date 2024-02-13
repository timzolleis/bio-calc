import './App.css'
import {Navbar} from "@/components/navbar.tsx";
import {PercentageCounter} from "@/components/percentage-counter.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";


interface CalculatePercentageProps {
    birthDate: Date;
    leaveDate: Date;
    switchDate: Date;
}

function calculatePercentage({birthDate, leaveDate, switchDate}: CalculatePercentageProps): number {
    const day = 1000 * 60 * 60 * 24;
    const totalDaysLived = Math.round((leaveDate.getTime() - birthDate.getTime()) / day);
    const daysLivedBeforeSwitch = Math.round((switchDate.getTime() - birthDate.getTime()) / (day));
    const daysLivedAfterSwitch = totalDaysLived - daysLivedBeforeSwitch;
    //Get the percentage of days lived after the switch date
    return (daysLivedAfterSwitch / totalDaysLived) * 100;

}




function App() {
    const [percentage, setPercentage] = useState<number >(0);


    return (
        <main className={"min-h-screen h-full"}>
            <Navbar/>
            <div className={"w-full flex justify-center mt-32"}>
                <PercentageCounter percentage={percentage}/>
            </div>
            <main className={"px-3 py-4 w-full bottom-0 absolute"}>
                <form className={"space-y-4"} onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.target as HTMLFormElement);
                    const birthDate = new Date(formData.get("birthDate") as string);
                    const leaveDate = new Date(formData.get("leaveDate") as string);
                    const switchDate = new Date(formData.get("switchDate") as string);
                    const percentage = calculatePercentage({birthDate, leaveDate, switchDate});
                    setPercentage(percentage > 100 ? 100 : percentage);

                }}>

                    <div className={"grid gap-2"}>
                        <Label>Bio-Umstellungsdatum</Label>
                        <input required={true} name={"switchDate"} defaultValue={"2017-05-01"} className={"p-2 rounded-md border"} type={"date"}/>
                    </div>
                    <div className={"grid gap-2"}>
                        <Label>Geburtsdatum</Label>
                        <input required={true} name={"birthDate"} className={"p-2 rounded-md border"} type={"date"}/>
                    </div>
                    <div className={"grid gap-2"}>
                        <Label>Abgangsdatum</Label>
                        <input required={true} name={"leaveDate"} defaultValue={new Date().toISOString().substring(0, 10)} className={"p-2 rounded-md border"} type={"date"}/>
                    </div>
                    <Button className={"w-full"}>Berechnen</Button>
                </form>


            </main>




        </main>
    )
}

export default App
