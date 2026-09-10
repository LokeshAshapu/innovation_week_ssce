import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Innovation Week 2026 — Build, Pitch & Win Big | Sri Sivani College of Engineering',
  description: 'Building the Next Generation of Tech Leaders. Organized by Dept of CSE & AI-ML in collaboration with Ratan Tata Innovation Hub.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  )
}
