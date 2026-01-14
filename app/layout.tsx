export const metadata = {
  title: 'Rota dos Castros do Noroeste de Portugal',
  description: 'Companheiro de viagem digital da Rota dos Castros',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          background: '#fafafa',
        }}
      >
        {children}
      </body>
    </html>
  );
}
