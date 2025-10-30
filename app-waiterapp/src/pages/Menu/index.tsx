import { NotebookText } from 'lucide-react'

import { PageHeader } from '@/features/Structor/components/PageHeader'

export default function Menu() {
  return (
    <div>
      <PageHeader
        icon={<NotebookText />}
        title="Cardápio"
        description="Gerencie os produtos do seu estabelecimento"
      />
    </div>
  )
}
