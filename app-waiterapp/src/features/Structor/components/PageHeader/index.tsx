import type { PageHeaderProps } from './types'

export function PageHeader({ icon, title, description, button }: PageHeaderProps) {
  return (
    <header className="w-full flex items-center justify-between mb-8 py-6 px-4 sm:px-0">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span>{icon}</span>
          <h1 className="font-bold text-xl">{title}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      {button && <div>{button}</div>}
    </header>
  )
}
