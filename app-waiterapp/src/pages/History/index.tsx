import { SquareMenu } from 'lucide-react'

import { PageHeader } from '@/features/Structor/components/PageHeader'

export default function History() {
  return (
    <div>
      <PageHeader
        icon={<SquareMenu />}
        title="Histórico"
        description="Visualize pedidos anteriores"
      />
    </div>
  )
}
