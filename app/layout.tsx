import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/layout/navigation/Navigation';
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
            <body className="font-maruburi bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                <ThemeProvider attribute="class">
                    <Navigation />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
