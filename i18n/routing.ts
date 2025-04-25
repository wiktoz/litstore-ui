import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
    localeDetection: true,
});
 
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);