import {string, object, boolean} from "yup"
import {yupResolver} from "@hookform/resolvers/yup"

const schema = object().shape({
    name: string().required('Name is required'),
    display_name: string().required("Display Name is required"),
})

const resolver = yupResolver(schema)

export { resolver }