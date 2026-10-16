import Image from 'next/image';
import type { ComponentProps } from 'react';
import { imageSizes } from '@/utils/imageSizes';

export default function PostImage({
    src,
    alt = '',
    width,
    height,
    style,
    ...props
}: ComponentProps<'img'>) {
    const imageWidth = Number(width);
    const imageHeight = Number(height);
    const local = typeof src === 'string' && src.startsWith('/') && !src.startsWith('//');

    if (local && imageWidth > 0 && imageHeight > 0) {
        return (
            <Image
                {...props}
                src={src}
                alt={alt}
                width={imageWidth}
                height={imageHeight}
                style={style}
                sizes={imageSizes(imageWidth, style?.width)}
                loading="lazy"
                decoding="async"
            />
        );
    }

    // External images without intrinsic dimensions keep their natural aspect ratio.
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={src} alt={alt} width={width} height={height} style={style} loading="lazy" decoding="async" />;
}
