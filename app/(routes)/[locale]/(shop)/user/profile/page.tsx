import AddressesContainer from "@/app/components/user/AddressesContainer"

const UserPage = () => {
    
    return(
        <div className="flex flex-row gap-20">
            <div className="w-1/4">
                <p className="text-gray-800 font-bold">My Account</p>
                <div className="h-px rounded-full bg-gray-300 my-2"></div>
                <div className="px-2 text-gray-500 text-sm flex flex-col gap-2 cursor-pointer">
                    <p>Orders and Returns</p>
                    <p>Address List</p>
                    <p>Settings</p>
                </div>
            </div>
            <div className="w-full">
                <h1 className="text-gray-800 font-bold text-xl mb-4">Address List</h1>
                <div className="h-px rounded-full bg-gray-300 my-2"></div>
                <AddressesContainer/>
            </div>
            
        </div>
    )
}

export default UserPage

