import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return <h1 className="text-2xl font-bold">Welcome, {session.user?.email}</h1>;
}
