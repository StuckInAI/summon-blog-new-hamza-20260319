import { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

type CardHeaderProps = {
  children: ReactNode
}

type CardTitleProps = {
  children: ReactNode
}

type CardContentProps = {
  children: ReactNode
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className || ''}`}>
      {children}
    </div>
  )
}

export function CardHeader({ children }: CardHeaderProps) {
  return <div className="mb-4">{children}</div>
}

export function CardTitle({ children }: CardTitleProps) {
  return <h3 className="text-lg font-semibold">{children}</h3>
}

export function CardContent({ children }: CardContentProps) {
  return <div>{children}</div>
}