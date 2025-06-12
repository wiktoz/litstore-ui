import Link from "next/link"
import {ReactElement} from "react";

interface Props {
    icon: ReactElement,
    title: string,
    link: string
}

export default function SidebarButton({icon,title,link}:Props){
    return(
        <Link href={link}>
            <div className="relative flex flex-row items-center justify-left bg-gray-700 rounded-2xl p-3 hover:cursor-pointer hover:bg-gray-600 transition-all">
                <div className="mx-1.5">
                    {icon}
                </div>
                <div className="text-gray-100 text-sm">
                    {title}
                </div>
            </div>
        </Link>
    )
}