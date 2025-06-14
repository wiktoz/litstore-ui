import {NextIntlClientProvider} from 'next-intl'
import {getMessages} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {routing} from '@/i18n/routing'
import ShoppingCartProvider from '@/app/contexts/ShoppingCart'
import "@/app/css/globals.css"
import { AuthProvider } from '@/app/contexts/Auth'
 
export default async function LocaleLayout({children, params}:LayoutInterface) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    return notFound()
  }
 
  const messages = await getMessages()
 
    return (
        <html lang={locale}>
        <body>
            <AuthProvider>
                <NextIntlClientProvider messages={messages}>
                    <ShoppingCartProvider>
                        {children}
                    </ShoppingCartProvider>
                </NextIntlClientProvider>
            </AuthProvider>
        </body>
        </html>
    )
}