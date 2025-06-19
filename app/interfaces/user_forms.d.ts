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

interface ProductInsertFormInterface {
    name: string,
    manufacturer: string,
    new: boolean,
    active: boolean,
    date_range: boolean,
}

interface VariantInsertFormInterface {
    name: string,
    display_name: string,
}