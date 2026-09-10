function PagePlaceholder({ title, description = 'This area is ready for its next feature.' }) {
  return <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"><p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">JobHub workspace</p><h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1><p className="mt-3 max-w-2xl text-slate-600">{description}</p></div></section>
}

export default PagePlaceholder
