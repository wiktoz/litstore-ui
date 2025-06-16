import {string, object, boolean} from "yup"
import {yupResolver} from "@hookform/resolvers/yup"

const schema = object().shape({
    name: string().required('Name is required'),
    manufacturer: string().required("Manufacturer is required"),
    new: boolean().required("New is required"),
    active: boolean().required("Active is required"),
    date_range: boolean().required("Date Range is required"),
})

const resolver = yupResolver(schema)

export { resolver }