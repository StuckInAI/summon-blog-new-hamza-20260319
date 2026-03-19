export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} Next.js Blog. All rights reserved.</p>
      </div>
    </footer>
  )
}
