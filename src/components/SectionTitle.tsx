type SectionTitleProps = {
  title: string
  kicker?: string
}

export function SectionTitle({ title, kicker }: SectionTitleProps) {
  return (
    <div className="mb-4">
      {kicker ? <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red">{kicker}</p> : null}
      <h2 className="text-2xl font-black tracking-tight text-brand-ink">{title}</h2>
    </div>
  )
}
