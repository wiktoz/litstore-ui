import {string, object} from "yup"
import {yupResolver} from "@hookform/resolvers/yup"

const schema = object().shape({
    email: string().email('Not valid email').required('Email is required')
})

const resolver = yupResolver(schema)

export { resolver }