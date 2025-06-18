import { PlusIcon } from "@heroicons/react/24/outline"

const Header = () => {
    return(
        <div className="flex gap-4 bg-white rounded-xl p-4">
            <div className="border rounded-xl p-1.5 h-12 w-12 flex items-center justify-center self-center">
                <PlusIcon width={26} height={26}/>
            </div>
            <div className="flex flex-col">
                <h1 className="font-bold text-lg">Insert Product</h1>
                <p className="text-gray-500 text-xs md:w-1/2">
                    Welcome to your product editor — where adding something new is quick, simple, and seamless. Just fill in the essentials, and your next bestseller is ready to shine.
                </p>
            </div>
            
        </div>
    )
}

export default Header