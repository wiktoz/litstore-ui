'use client'

import useSWR from "swr"
import { fetcher } from "@/app/utils/api"
import Carousel from "../sliders/Carousel"
import { useState } from "react"
import OptionSelect from "./OptionSelect"

interface ProductPageInterface {
    slug: string
}

enum SelectType {
    Select = "select",
    Button = "button"
}

interface ProductInterface {
    name: string,
    manufacturer: string,
    new: boolean,
    active: boolean,
    slug: string,
    images: [{
        order_index: number,
        image: {
            url: string,
            mime_type: string,
            size: number
        }
    }],
    variants: [{
        id: string,
        name: string,
        display_name: string,
        select_type: SelectType,
        options: [{
            id: string,
            name: string
        }]
    }],
    items: [{
        id: string,
        price: number,
        promo_price: number,
        stock: number,
        unit: string,
        sku: string,
        variant_options: [{
            id: string,
            variant_id: string,
        }]
    }]
}

interface VariantOption {
    id: string,
    variant_id: string
}

const ProductPage = ({slug}:ProductPageInterface) => {
    const { data: product, error: productError, isLoading: productLoading } = useSWR<ProductInterface>('/products/slug/' + slug, fetcher, {errorRetryInterval: 10000, errorRetryCount: 5})

    const [selectedOptions, setSelectedOptions] = useState<VariantOption[]>([])

    const selectOption = (variant_id: string, option_id: string) => {
        setSelectedOptions(prev => {
            const filtered = prev.filter(opt => opt.variant_id !== variant_id);
            return [...filtered, { variant_id, id: option_id }];
        })
    }

    function findItem(items: ProductInterface["items"], targetVariantOptions: VariantOption[]) {
        const normalize = (arr: { id: string; variant_id: string }[]) =>
            arr
            .map(opt => `${opt.variant_id}:${opt.id}`)
            .sort()
            .join("|");

        const targetKey = normalize(targetVariantOptions);

        return items.find(item => {
            const itemKey = normalize(item.variant_options);
            return itemKey === targetKey;
        })
    }

    function checkStock() {
        if(!product)
            return 0

        const item = findItem(product.items, selectedOptions)
        return item ? item.stock : 0
    }

    return(
        <div className="flex flex-col md:flex-row gap-8 md:items-center md:justify-center">
            <div className="flex w-full md:w-auto md:h-[calc(100vh-8rem)] md:mx-0 self-start px-4">
                {
                    product &&
                    <Carousel items={product.images.map((item:any) => item.image.url)} />
                }
            </div>
            <div className="flex flex-col px-6 md:p-4 gap-2 justify-center">
                <div className="flex flex-col gap-1 mb-8">
                    {
                        product && product.new &&
                        <div className="text-xs text-gray-500 rounded-xl w-fit mb-1">new</div>
                    }
                    <h1 className="font-semibold text-xl">
                        {product && product.name}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {product && product.manufacturer}
                    </p>
                </div>
                <div>
                    {
                        product && product.variants.map(variant => {
                            return(
                                <OptionSelect 
                                    key={variant.id}
                                    variant={variant} 
                                    pickOption={selectOption}
                                    checkStock={checkStock}
                                />
                            )
                        })
                    }
                </div>
                <div className="md:w-72 bg-[#222] hover:bg-[#111] hover:text-gray-300 transition py-2 px-6 text-center rounded-xl text-white text-sm font-semibold cursor-pointer">
                    Add To Bag
                </div>
            </div>
        </div>
    )
}

export default ProductPage