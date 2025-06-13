import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline"

const SignOut = () => {
    return(
        <div className="flex items-center justify-center gap-1 cursor-pointer hover:text-gray-400 transition">
            <ArrowLeftStartOnRectangleIcon width={19} height={19} />
            <p>Sign Out</p>
        </div>
    )
}

export default SignOut