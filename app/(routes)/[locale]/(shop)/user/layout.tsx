import RedirectGuard from "@/app/contexts/Redirect"
import { ReactElement } from "react"

export default function UserLayout({children}:{children: ReactElement}){
    return(
        <RedirectGuard>
            {children}
        </RedirectGuard>
    )
}