export default function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen">
      {children}
    </main>
  );
}