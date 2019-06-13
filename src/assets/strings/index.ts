import ja from './ja.yaml'
import en from './en.yaml'

const locales = { ja, en }
type LocaleKey = keyof typeof locales

const language = (window.navigator.languages.find((lang: string) => lang in locales) || 'ja') as LocaleKey

export default locales[language]
