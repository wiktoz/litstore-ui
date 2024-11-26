import {getTranslations} from 'next-intl/server'
import {useTranslations} from 'next-intl'

const Home = () => {
    const t = useTranslations('Home')
    
    return (
        <div>
            Hi im at {t('welcome')}
        </div>
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
