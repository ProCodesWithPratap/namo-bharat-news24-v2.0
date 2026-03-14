export function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-white">
      <div className="container-shell grid gap-6 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold">Namo Bharat News 24</h3>
          <p className="mt-2 text-sm text-black/70">Production-ready starter for a modern digital newsroom.</p>
        </div>
        <div>
          <h4 className="font-semibold">Core Sections</h4>
          <ul className="mt-2 space-y-1 text-sm text-black/70">
            <li>Homepage</li>
            <li>Category pages</li>
            <li>Article pages</li>
            <li>Authors</li>
            <li>Videos & galleries</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Production Notes</h4>
          <ul className="mt-2 space-y-1 text-sm text-black/70">
            <li>Cloudflare in front</li>
            <li>Sentry before launch</li>
            <li>Preview deployments on every PR</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
