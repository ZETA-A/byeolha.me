import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import '@styles/globals.css';
import Navigation from '@/components/layout/navigation/Navigation';
import { maruburi, nanumHuman } from '@/utils/fonts';
import { ThemeProvider } from 'next-themes';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from '@/components/layout/footer/Footer';
import { siteConfig } from '@/config/config';

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: { template: '%s', absolute: siteConfig.title },
    description: '세상을 바꾸기 위해 개발합니다',
    authors: [siteConfig.author],
    openGraph: {
        title: { template: '%s', absolute: siteConfig.title },
        siteName: siteConfig.title,
        description: '세상을 바꾸기 위해 개발합니다',
        url: '/',
    },
    twitter: {
        title: { template: '%s', absolute: siteConfig.title },
        description: '세상을 바꾸기 위해 개발합니다.',
    },
    verification: {
        other: {
            'naver-site-verification': process.env.NAVER_SITE_VERIFICATION,
        },
    },
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
            className={`${nanumHuman.variable} ${maruburi.variable} bg-page subpixel-antialiased`}
        >
            <body className="flex flex-col font-serif">
                <GoogleAnalytics gaId={process.env.GA_ID} />
                <ThemeProvider attribute="class">
                    <div className="w-full max-w-6xl mx-auto px-6 flex flex-col min-h-screen">
                        <Navigation />
                        <main className="flex-1 max-w-2xl w-full mx-auto my-12">
                            {children}
                            <SpeedInsights />
                        </main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
