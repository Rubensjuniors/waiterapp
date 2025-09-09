import { useTranslation } from 'react-i18next'

export function App() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('bemVindo')}</h1>
      <p>{t('descricao')}</p>
    </div>
  )
}
