'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'

const navItems = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'Analytics', href: '/dashboard/analytics' },
  { name: 'Users', href: '/dashboard/users' },
  { name: 'Settings', href: '/dashboard/settings' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              'block px-4 py-2 rounded-md transition',
              pathname === item.href
                ? 'bg-primary-100 text-primary-600'
                : 'hover:bg-gray-100'
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}