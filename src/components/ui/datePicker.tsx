import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {CalendarIcon} from "lucide-react";
import { format } from "date-fns"
import {Calendar} from "@/components/ui/calendar.tsx";
const DatePicker = ({date, setDate, className} : {date: Date | undefined, setDate: (date: Date | undefined) => void, className?: string | undefined}) => {
    return(
        <Popover>
            <PopoverTrigger>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className={"mr-2 h-4 w-4"} />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("w-auto p-0", className)}>
                <Calendar
                mode={"single"}
                selected={date}
                onSelect={setDate}
                initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker;