import { NetworkError, ServerError } from "@/app/utils/api"
import { ExclamationTriangleIcon, ServerStackIcon, SignalSlashIcon } from "@heroicons/react/24/outline"

const Error = ({error}:{error: Error}) => {
    return(
        <div>
            <div className="flex items-center gap-1">
                {
                    error instanceof NetworkError ?
                        <SignalSlashIcon width={20} height={20}/> :
                    error instanceof ServerError ?
                        <ServerStackIcon width={20} height={20}/> :
                        <ExclamationTriangleIcon width={20} height={20}/>
                }
                <p className="font-semibold">{error?.name || "Error"}</p>
            </div>
            <div className="text-xs">
                {error?.message || "Try again later"}
            </div>
        </div>
    )
}

export default Error