interface SignInFormInterface {
    email: string,
    password: string
}

interface SignUpFormInterface {
    email: string,
    password: string,
    repeat_password: string
}

interface ResetPasswordInterface {
    email: string
}