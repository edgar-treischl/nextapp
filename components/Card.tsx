import { ReactNode } from 'react'

type CardProps = {
  title: string
  description: string
  children?: ReactNode
}

export default function Card({ title, description, children }: CardProps) {
  return (
    <div className="border rounded-lg p-6 shadow hover:shadow-lg transition flex flex-col items-center text-center space-y-4">
      {children && <div>{children}</div>}
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  )
}
