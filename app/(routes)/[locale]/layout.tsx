import {NextIntlClientProvider} from 'next-intl'
import {getMessages} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {routing} from '@/i18n/routing'
import ShoppingCartProvider from '@/app/contexts/ShoppingCart'
import "@/app/css/globals.css"
import { AuthProvider } from '@/app/contexts/Auth'
import { locales } from '@/app/utils/dictionaries'

type Locale = typeof locales[number]

export default async function LocaleLayout({children, params}:LayoutInterface) {
    const { locale } = await params

    if (!routing.locales.includes(locale as Locale)) {
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