import {NextIntlClientProvider} from 'next-intl'
import {getMessages} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {routing} from '@/i18n/routing'

interface LayoutInterface {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}
 
export default async function LocaleLayout({children, params}:LayoutInterface) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    return notFound();
  }
 
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}