import { Button } from 'components/ui/button'

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-wallbit-fe8a4ef0-rVX4Xq56Eqgxl6UPh3uQLOOBzijwHe.svg"
          alt="Wallbit"
          className="h-[30px] w-auto"
        />
      </div>
    </header>
  )
}