import type { ReactNode } from 'react'

interface Props {
  title: string
  icon?: string
  children: ReactNode
  style?: React.CSSProperties
  bodyStyle?: React.CSSProperties
  allowOverflow?: boolean
}

export default function Card({ title, icon, children, style, bodyStyle, allowOverflow = false }: Props) {
  return (
    <div style={{
      background: 'var(--s1)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r)',
      overflow: allowOverflow ? 'visible' : 'hidden',
      ...style,
    }}>
      <div style={{
        padding: '10px 16px',
        fontFamily: 'var(--mono)',
        fontSize: 9,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: 'var(--muted2)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        {icon && <span>{icon}</span>}
        {title}
      </div>

      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12, ...bodyStyle }}>
        {children}
      </div>
    </div>
  )
}
