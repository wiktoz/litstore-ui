import Sidebar from "@/app/components/layouts/admin/Sidebar";

export default function AdminLayout({children}:{children:React.ReactNode}) {
    return(
        <div className="flex flex-col md:flex-row bg-gray-100">
            <Sidebar/>
            <div className="flex flex-col p-4 md:px-8 grow bg-gray-100">
                {children}
            </div>
        </div>
    )
}