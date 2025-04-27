import {getTranslations} from 'next-intl/server'
import SignIn from "@/app/components/auth/SignIn"

const SignInPage = () => {
    return (
      <SignIn/>
    )
}

export default SignInPage

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  
  const t = await getTranslations({ locale, namespace: 'SignIn.metadata' })

  return {
    title: t('title'),
    description: t('description')
  };
}