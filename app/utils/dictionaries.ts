import 'server-only';

type Dictionary = { [key: string]: string | Dictionary };

const dictionaries: Record<string, () => Promise<Dictionary>> = {
    en: () => import('@/public/dictionaries/en.json').then(module => module.default),
    fr: () => import('@/public/dictionaries/fr.json').then(module => module.default),
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
    const dictionaryLoader = dictionaries[locale];
    
    if (!dictionaryLoader) {
        throw new Error(`Dictionary for locale '${locale}' not found`);
    }

    return dictionaryLoader();
}

export const locales = ['en', 'fr', 'de', 'pl'] as const;