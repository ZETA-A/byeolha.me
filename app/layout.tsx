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
            className={`${maruburi.variable}`}
        >
            <body className="flex flex-col font-maruburi dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                <ThemeProvider attribute="class">
                    <div className="w-full max-w-6xl mx-auto px-8 flex flex-col min-h-screen">
                        <Navigation />
                        <main className="flex-1 max-w-2xl w-full mx-auto my-8">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
