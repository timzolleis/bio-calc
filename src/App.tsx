import './App.css'
import {Navbar} from "@/components/navbar.tsx";
import {PercentageCounter} from "@/components/percentage-counter.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {DatePicker} from "@/components/ui/date-picker.tsx";
import {differenceInDays, format} from "date-fns";
import {toast, Toaster} from "sonner";

function App() {
    const defaultSwitchDate = localStorage.getItem("switchDate") || "2017-05-01";
    const [birthDate, setBirthDate] = useState<Date | undefined>();
    const [leaveDate, setLeaveDate] = useState<Date | undefined>();
    const [switchDate, setSwitchDate] = useState<Date | undefined>(new Date(defaultSwitchDate));
    const totalDaysLived = leaveDate && birthDate ? differenceInDays(leaveDate, birthDate) : 0;
    const daysLivedAfterSwitch = birthDate && leaveDate && switchDate ? birthDate.getTime() <= switchDate.getTime() ? differenceInDays(leaveDate, switchDate) : totalDaysLived : 0;
    const percentage = daysLivedAfterSwitch / totalDaysLived * 100 || 0;

    const onSetBirthDate = (date?: Date) => {
        if (!date) return;
        if (leaveDate && date.getTime() > leaveDate.getTime()) {
            toast.error("Das Geburtsdatum kann nicht nach dem Abgangsdatum liegen")
            return
        }
        setBirthDate(date)
    }

    const onSetLeaveDate = (date?: Date) => {
        if (!date) return;
        if (birthDate && date.getTime() < birthDate.getTime()) {
            toast.error("Das Abgangsdatum kann nicht vor dem Geburtsdatum liegen")
            return
        }
        setLeaveDate(date)
    }

    const onSetDefaultSwitchDate = (date?: Date) => {
        if (!date) return;
        localStorage.setItem("switchDate", format(date, "yyyy-MM-dd"))
        setSwitchDate(date)
    }


    return (
        <main>
            <Toaster richColors={true}/>
            <Navbar/>
            <div className={"w-full flex justify-center"}>
                <PercentageCounter caption={`${daysLivedAfterSwitch} / ${totalDaysLived} Tagen`}
                                   percentage={percentage} key={percentage}/>
            </div>
            <div className={"flex justify-center w-full"}>
                <Button size={"sm"} onClick={() => {
                    setBirthDate(undefined);
                    setLeaveDate(undefined);
                }} variant={"outline"} className={"rounded-full"}>Zurücksetzen</Button>
            </div>

            <main className={"px-3 py-4 w-full mt-10"}>
                <fieldset className={"space-y-4"}>
                    <div className={"grid gap-2"}>
                        <Label>Bio-Umstellungsdatum</Label>
                        <DatePicker defaultValue={switchDate} onSelect={onSetDefaultSwitchDate}/>
                    </div>
                    <div className={"grid gap-2"}>
                        <Label>Geburtsdatum</Label>
                        <DatePicker defaultValue={birthDate} onSelect={onSetBirthDate}/>
                    </div>
                    <div className={"grid gap-2"}>
                        <Label>Abgangsdatum</Label>
                        <DatePicker defaultValue={leaveDate} onSelect={onSetLeaveDate}/>
                    </div>
                </fieldset>

            </main>


        </main>
    )
}

export default App
