import 'server-only';

const dictionaries: Record<string, () => Promise<Record<string, any>>> = {
  en: () => import('@/public/dictionaries/en.json').then((module) => module.default),
  fr: () => import('@/public/dictionaries/fr.json').then((module) => module.default),
}

export const getDictionary = async (locale: string): Promise<Record<string, any>> => {
  const dictionaryLoader = dictionaries[locale];
  
  if (!dictionaryLoader) {
    throw new Error(`Dictionary for locale '${locale}' not found`)
  }

  return dictionaryLoader()
}
