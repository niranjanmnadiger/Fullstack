import { useState, useRef, useEffect } from 'react'
import { LINES, LINE_COLORS, type LineKey } from '../data/lines'
import Card from './Card'

interface Props {
  role: 'board' | 'drop'
  line: LineKey
  station: string
  onLineChange: (l: LineKey) => void
  onStationChange: (s: string) => void
}

const LINE_LABELS: Record<LineKey, string> = {
  purple: 'Purple', green: 'Green', yellow: 'Yellow',
}

export default function LinePicker({ role, line, station, onLineChange, onStationChange }: Props) {
  const [query, setQuery]   = useState('')
  const [open, setOpen]     = useState(false)
  const wrapRef             = useRef<HTMLDivElement>(null)
  const inputRef            = useRef<HTMLInputElement>(null)

  const icon  = role === 'board' ? '⬆' : '⬇'
  const title = role === 'board' ? 'Boarding Station' : 'Dropping Station'
  const c     = LINE_COLORS[line]

  const filtered = LINES[line].filter(s =>
    !query.trim() || s.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false); setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function handleLineChange(l: LineKey) {
    onLineChange(l); onStationChange(LINES[l][0]); setQuery(''); setOpen(false)
  }

  function pickStation(s: string) {
    onStationChange(s); setOpen(false); setQuery('')
  }

  function openDropdown() {
    setOpen(true); setTimeout(() => inputRef.current?.focus(), 20)
  }

  return (
    <Card title={title} icon={icon}>
      {/* Line tabs */}
      <div>
        <span style={{ display:'block', fontSize:9, fontFamily:'var(--mono)', letterSpacing:1.5,
          textTransform:'uppercase', color:'var(--muted2)', marginBottom:6 }}>Select Line</span>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:5 }}>
          {(['purple','green','yellow'] as LineKey[]).map(l => {
            const active = line === l
            const lc = LINE_COLORS[l]
            return (
              <button key={l} onClick={() => handleLineChange(l)} style={{
                border:`1.5px solid ${active ? lc.dot : 'var(--border)'}`,
                background: active ? lc.bg : 'var(--s2)',
                borderRadius:10, padding:'9px 4px',
                display:'flex', flexDirection:'column', alignItems:'center', gap:3,
                fontFamily:'var(--mono)', fontSize:10, fontWeight:700,
                color:lc.text, cursor:'pointer', transition:'all .18s', letterSpacing:.5,
              }}>
                <div style={{ width:20, height:3, borderRadius:2, background:lc.dot }} />
                {LINE_LABELS[l].toUpperCase()}
              </button>
            )
          })}
        </div>
      </div>

      {/* Station picker */}
      <div ref={wrapRef} style={{ position:'relative' }}>
        <span style={{ display:'block', fontSize:9, fontFamily:'var(--mono)', letterSpacing:1.5,
          textTransform:'uppercase', color:'var(--muted2)', marginBottom:6 }}>Station</span>

        <button onClick={openDropdown} style={{
          width:'100%', background:'var(--s2)',
          border:`1px solid ${open ? c.dot : 'var(--border2)'}`,
          borderRadius:9, color:'var(--text)', padding:'10px 34px 10px 12px',
          fontSize:13, textAlign:'left', cursor:'pointer',
          transition:'border-color .15s', fontFamily:'var(--sans)',
          display:'flex', alignItems:'center', justifyContent:'space-between',
        }}>
          <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{station}</span>
          <span style={{ fontSize:9, color:'var(--muted2)', flexShrink:0,
            transform: open ? 'rotate(180deg)' : 'none', transition:'transform .18s' }}>▼</span>
        </button>

        {open && (
          <div style={{
            position:'absolute', top:'100%', left:0, right:0, zIndex:100,
            background:'var(--s2)', border:`1px solid ${c.dot}`,
            borderRadius:10, marginTop:4, overflow:'hidden',
            boxShadow:'0 8px 32px rgba(0,0,0,0.5)',
          }}>
            <div style={{ padding:'8px 10px', borderBottom:'1px solid var(--border)' }}>
              <input ref={inputRef} type="text" placeholder="Search station…"
                value={query} onChange={e => setQuery(e.target.value)}
                style={{ width:'100%', background:'var(--s3)',
                  border:'1px solid var(--border)', borderRadius:7,
                  color:'var(--text)', padding:'7px 10px',
                  fontSize:13, outline:'none', fontFamily:'var(--sans)' }} />
            </div>
            <div style={{ maxHeight:220, overflowY:'auto' }}>
              {filtered.length === 0 ? (
                <div style={{ padding:12, textAlign:'center', fontSize:11,
                  color:'var(--muted2)', fontFamily:'var(--mono)' }}>
                  No stations match "{query}"
                </div>
              ) : filtered.map((s, i) => {
                const isSel = s === station
                return (
                  <button key={s} onClick={() => pickStation(s)} style={{
                    width:'100%', textAlign:'left', padding:'9px 14px',
                    background: isSel ? c.bg : i%2===0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                    border:'none', borderBottom:'1px solid var(--border)',
                    color: isSel ? c.text : 'var(--text)',
                    fontSize:13, cursor:'pointer', fontFamily:'var(--sans)',
                    display:'flex', alignItems:'center', gap:8,
                  }}>
                    {isSel && <span style={{ color:c.dot, fontSize:10 }}>●</span>}
                    <span>{s}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
