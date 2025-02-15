import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/navigation/navigation';
import { maruburi } from '@/utils/fonts';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
    title: 'byeolha.me',
    description: '세상을 바꾸기 위해 개발합니다',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning={true}
            className={`${maruburi.variable}`}
        >
            <body className="font-maruburi">
                <ThemeProvider attribute="class">
                    <Navigation />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
