import { useEffect, useState } from 'react'

type User = {
  id: number
  name: string
  email: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="text-center py-20">Loading users...</p>

  return (
    <section className="container mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold mb-10 text-center">Users Example</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div
            key={user.id}
            className="border rounded-lg p-6 shadow hover:shadow-lg transition flex flex-col items-center text-center space-y-4"
          >
            <img
              src={`https://i.pravatar.cc/150?u=${user.id}`}
              alt={user.name}
              className="rounded-full w-24 h-24"
            />
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="text-gray-700">{user.email}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
