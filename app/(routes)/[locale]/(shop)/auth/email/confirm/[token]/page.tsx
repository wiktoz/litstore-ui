import ConfirmEmail from "@/app/components/auth/ConfirmEmail"

const ConfirmEmailPage = async ({params}:{params: Promise<{ token: string }>}) => {
    const { token } = await params

    return(
        <ConfirmEmail token={token}/>
    )
}

export default ConfirmEmailPage