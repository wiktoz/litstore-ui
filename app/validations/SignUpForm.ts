import {string, object, ref} from "yup"
import {yupResolver} from "@hookform/resolvers/yup"

const schema = object().shape({
    email: string().email('Not valid email').required('Email is required'),
    password: string().required("Password is required"),
    repeat_password: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Repeat Password is required'),
})

const resolver = yupResolver(schema)

export { resolver }