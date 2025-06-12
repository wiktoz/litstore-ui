'use client'

import useSWR from "swr"
import { fetcher } from "@/app/utils/api"

interface ProductPageInterface {
    slug: string
}

const ProductPage = ({slug}:ProductPageInterface) => {
    const { data: product, error: productError, isLoading: productLoading } = useSWR<UserInterface>('/products/slug/' + slug, fetcher, {errorRetryInterval: 10000, errorRetryCount: 5})

    return(
        <div>
            {JSON.stringify(product)}
        </div>
    )
}

export default ProductPage