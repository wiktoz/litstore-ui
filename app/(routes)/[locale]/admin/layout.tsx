import Sidebar from "@/app/components/layouts/admin/Sidebar";

export default function AdminLayout({children}:{children:React.ReactNode}) {
    return(
        <div className="flex flex-col md:flex-row">
            <Sidebar/>
            <div className="p-2">
                {children}
            </div>
        </div>
    )
}