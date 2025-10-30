import { UsersRound } from 'lucide-react'

import { PageHeader } from '@/features/Structor/components/PageHeader'

export default function Users() {
  return (
    <div>
      <PageHeader
        icon={<UsersRound />}
        title="Usuários"
        description="Cadastre e gerencie seus usuários"
      />
    </div>
  )
}
