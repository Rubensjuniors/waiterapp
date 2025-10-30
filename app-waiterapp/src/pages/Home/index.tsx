import { House } from 'lucide-react'

import { PageHeader } from '@/features/Structor/components/PageHeader'

export default function Home() {
  return (
    <div>
      <PageHeader
        icon={<House />}
        title="Home"
        description="Acompanhe os pedidos dos clientes"
        button={<>Button</>}
      />
    </div>
  )
}
