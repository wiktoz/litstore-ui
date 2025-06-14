'use client'
import { useAuthRedirect } from "./Auth"

export default function RedirectGuard({ children }: { children: React.ReactNode }) {
    useAuthRedirect()
    return <>{children}</>
}