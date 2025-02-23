import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/layout/navigation/Navigation';
import { maruburi } from '@/utils/fonts';
import { ThemeProvider } from 'next-themes';
import Footer from '@/components/layout/footer/Footer';

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
            className={`${maruburi.variable} h-full`}
        >
            <body className="flex flex-col h-full font-maruburi bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                <ThemeProvider attribute="class">
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
                        <Navigation />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
