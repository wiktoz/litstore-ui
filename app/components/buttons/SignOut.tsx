import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline"

const SignOut = () => {
    return(
        <div className="flex items-center justify-center gap-1">
            <ArrowLeftStartOnRectangleIcon width={20} height={20} />
            <p>Sign Out</p>
        </div>
    )
}

export default SignOut