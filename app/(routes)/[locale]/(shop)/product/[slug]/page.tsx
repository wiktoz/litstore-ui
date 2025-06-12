import ProductPage from "@/app/components/product/ProductPage"

const Page = async ({params}:{params: Promise<{ slug: string }>}) => {
    const { slug } = await params

    return(
        <div>
            <ProductPage slug={slug}/>
        </div>
    )
}

export default Page