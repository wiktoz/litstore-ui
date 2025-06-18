import { Dispatch, SetStateAction, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

export interface RangeCalendarInterface {
    startDate: Date | null,
    setStartDate: Dispatch<SetStateAction<Date | null>>,
    endDate: Date | null,
    setEndDate: Dispatch<SetStateAction<Date | null>>
}

export default function RangeCalendar({startDate, setStartDate, endDate, setEndDate}:RangeCalendarInterface){
    const datetime = new Date()
    const date = new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate())

    const [previewYear, setPreviewYear] = useState(date.getFullYear())
    const [previewMonth, setPreviewMonth] = useState(date.getMonth() + 1)

    const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

    const days = ["Pn", "Wt", "Śr", "Czw", "Pt", "Sb", "Ndz"]
    const locale = 'pl'   

    const getMonthFullName = () => {
        return new Date(previewYear, previewMonth - 1).toLocaleString(locale, { month: 'long' })
    }

    const prevMonth = () => {
        if(previewMonth === 1){
            setPreviewMonth(12)
            setPreviewYear(previewYear - 1)
        }
        else{
            setPreviewMonth(previewMonth - 1)
        }
    }

    const nextMonth = () => {
        if(previewMonth === 12){
            setPreviewMonth(1)
            setPreviewYear(previewYear + 1)
        }
        else{
            setPreviewMonth(previewMonth + 1)
        }
    }

    const pickDate = (previewDay:number) => {
        const pickedDate = new Date(previewYear, previewMonth - 1, previewDay)

        if(startDate && endDate && startDate.toDateString() == endDate.toDateString()) {
            resetPick()
            return
        }

        if(!startDate || (pickedDate < startDate)){
            setStartDate(pickedDate)
            setEndDate(null)
            return
        }

        setEndDate(pickedDate)
    }

    const resetPick = () => {
        setStartDate(null)
        setEndDate(null)
    }

    const formatCurrentMonth = (month:number, year:number) => {
        let first = new Date(year, month - 1, 1).getDay()
        const maxDay = new Date(year, month, 0).getDate()

        if(first === 0) first = 7

        const cmonth = []

        for(let i = 1; i < first + maxDay; i++){
            cmonth.push(i < first ? null : i-first+1)
        }

        console.log(cmonth)
        return cmonth
    }

    const isDateBetween = (previewDay: number) => {
        if (!startDate) return false
    
        const pickedDate = new Date(previewYear, previewMonth - 1, previewDay)
    
        if (!endDate) {
            return pickedDate.toDateString() === startDate.toDateString()
        }
    
        return startDate <= pickedDate && pickedDate <= endDate
    }

    const isDateBetweenOnHover = (previewDay: number) => {
        if (!startDate || endDate || !hoveredDate) 
            return false
      
        const pickedDate = new Date(previewYear, previewMonth - 1, previewDay)
      
        const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        const hover = new Date(hoveredDate.getFullYear(), hoveredDate.getMonth(), hoveredDate.getDate())
      
        const min = start < hover ? start : hover
        const max = start > hover ? start : hover
      
        return pickedDate >= min && pickedDate <= max
    }

    const getRoundedCorners = (d: number): string => {
        const pickedDate = new Date(previewYear, previewMonth - 1, d);
        const pickedStr = pickedDate.toDateString();
    
        if (!startDate) return "rounded-2xl";
    
        const startStr = startDate.toDateString();
        const endStr = endDate?.toDateString();
        const hoveredStr = hoveredDate?.toDateString();
    
        const isStart = pickedStr === startStr;
        const isEnd = pickedStr === endStr;
        const isHovered = pickedStr === hoveredStr;
    
        if (isStart) {
            if (endStr === startStr) return "rounded-2xl"
            if (endDate) return "rounded-l-2xl";
            if (hoveredDate && !isHovered) return "rounded-l-2xl";
            return "rounded-2xl";
        }
    
        if (!endDate && isHovered) {
            return "rounded-r-2xl";
        }
    
        if (isEnd) {
            return "rounded-r-2xl";
        }
    
        return "";
    };
    

    const getBgColor = (d: number): string => {
        const pickedDate = new Date(previewYear, previewMonth - 1, d);
        const pickedStr = pickedDate.toDateString();
    
        // No startDate: highlight only hovered date
        if (!startDate) {
            return hoveredDate?.toDateString() === pickedStr ? "bg-gray-50" : "";
        }
    
        const isStart = pickedStr === startDate.toDateString();
        const isEnd = endDate && pickedStr === endDate.toDateString();
    
        if (isStart || isEnd) {
            return "bg-gray-700 text-white";
        }
    
        if (isDateBetween(d) || isDateBetweenOnHover(d)) {
            return "bg-gray-200";
        }
    
        return "";
    };
    


    return(
        <div className="flex flex-row flex-wrap">
            <div className="flex flex-row justify-between justify-items-center items-center mb-4 text-gray-500 w-full px-5">
                <ChevronLeftIcon width={18} height={18} className="flex-none w-4 h-4 hover:cursor-pointer" onClick={prevMonth} />
                <p className="grow text-center text-sm font-semibold">{getMonthFullName()} {previewYear}</p>
                <ChevronRightIcon width={18} height={18} className="flex-none w-4 h-4 hover:cursor-pointer" onClick={nextMonth} />
            </div>
            <div className="grid grid-cols-7 justify-items-center w-full">
                {
                    days.map(day => {
                        return(
                            <div key={day} className="font-semibold text-gray-700 mb-2 text-xs">{day}</div>
                        )
                    })
                }
                {
                    formatCurrentMonth(previewMonth, previewYear).map((d,i) => {
                        if(!d) return(
                            <div className="w-10 h-10" key={i}></div>
                        )

                        const processingDate = new Date(previewYear, previewMonth - 1, d)

                        return(
                            <div 
                                key={i}
                                onClick={processingDate >= date ? () => pickDate(d) : undefined}
                                onMouseEnter={() => setHoveredDate(processingDate)}
                                onMouseLeave={() => setHoveredDate(null)}
                                className="p-1 text-gray-600"
                            >
                                <div
                                    className={
                                        "flex justify-center items-center text-center w-10 h-10 " +
                                        (processingDate >= date ? (getBgColor(d) + " " + getRoundedCorners(d) + " hover:cursor-pointer") : "opacity-30")
                                    }
                                    
                                >
                                    <p className="w-full text-sm">{d}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}