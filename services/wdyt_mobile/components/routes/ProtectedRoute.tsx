import { useEffect } from "react"
import { Redirect } from "expo-router"
import { useRouter } from "expo-router"
import { useAuth } from "../../hooks/auth/useAuth"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()

  if (user?.id) {
    return children
  } else {
    return <Redirect href={"/login"} />
  }
}
