import {getTranslations} from 'next-intl/server'
import {useTranslations} from 'next-intl'

import Slider from "@/app/components/sliders/Slider"
import Image from 'next/image'

const Home = () => {
    const t = useTranslations('Home')
    
    return (
      <>
        <div className='h-screen'>
          <Slider/>
        </div>
        <div className='container mx-auto py-8'>
            <p className="text-3xl font-bold tracking-tight my-8">
                <span className="bg-gray-900 text-white pl-4 pr-1">New</span>
                <span className="text-gray-900">Arrivals</span>
            </p>
            <div>
              Hi im at {t('welcome')}
            </div>
            <div className="mt-10 flex">
                <p className="text-xs text-gray-300 font-light w-2/5">
                    LitStore is registered trademark. This is a demonstrative version for e-commerce software. All
                    products are not for sale.
                    Sample products names, brands and photos are taken from website misbhv.com and are own by MISBHV sp.
                    z o.o.
                </p>
            </div>
        </div>
      </>
    )
}

export default Home

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    
    const t = await getTranslations({ locale, namespace: 'Home.metadata' })

    return {
        title: t('title'),
        description: t('description')
    };
}
