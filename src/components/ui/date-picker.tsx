import {format} from "date-fns"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {CalendarIcon} from "@radix-ui/react-icons";
import React from "react";
import {de} from "date-fns/locale";


interface DatePickerProps {
    onSelect: (date?: Date) => void
    defaultValue?: Date
}

export function DatePicker({onSelect, defaultValue}: DatePickerProps) {

    const [date, setDate] = React.useState<Date | undefined>(defaultValue)
    if (defaultValue === undefined && date) {
        setDate(undefined)
    }

    const handleSelect = (date: Date) => {
        setDate(date)
        onSelect(date)
    }


   const footer = (
       <Button variant={"outline"} size={"sm"} onClick={() => handleSelect(new Date())}>Heute</Button>
   )

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    {date ? format(date, "PPP", {
                        locale: de
                    }) : <span>Datum Auswählen</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    footer={footer}
                    fromYear={2010} toYear={new Date().getFullYear()} captionLayout={"dropdown"}
                    mode="single"
                    selected={date}
                    onSelect={date => date && handleSelect(date)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
