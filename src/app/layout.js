import './globals.css';

export const metadata = {
  title: 'Payment Application',
  description: 'A simple payment application for scheduling withdrawals',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}