import {getTranslations} from 'next-intl/server'

const ProductPageLayout = ({children}:{children: React.ReactNode}) => {
    return children
}

export default ProductPageLayout

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    
    const t = await getTranslations({ locale, namespace: 'Home.metadata' })

    return {
        title: t('title'),
        description: t('description')
    };
}