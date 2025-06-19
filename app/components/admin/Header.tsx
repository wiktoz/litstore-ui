interface HeaderInterface {
    icon: React.ReactNode,
    title: string,
    description: string
}

const Header = ({icon, title, description}:HeaderInterface) => {
    return(
        <div className="flex gap-4 bg-white rounded-xl p-4">
            <div className="border rounded-xl p-1.5 h-12 w-12 flex items-center justify-center self-center">
                {icon}
            </div>
            <div className="flex flex-col">
                <h1 className="font-bold text-lg">{title}</h1>
                <p className="text-gray-500 text-xs w-full lg:w-1/2">
                    {description}
                </p>
            </div>
            
        </div>
    )
}

export default Header