// The article is max-w-2xl (42rem) with px-6 (1.5rem on each side).
export function imageSizes(intrinsicWidth: number, displayWidth?: string | number) {
    const width = typeof displayWidth === 'number' ? `${displayWidth}px` : displayWidth;
    const percent = width?.match(/^(\d+(?:\.\d+)?)%$/);
    if (percent) {
        const ratio = Math.min(Number(percent[1]), 100) / 100;
        return `(max-width: 45rem) calc(${ratio * 100}vw - ${ratio * 3}rem), ${ratio * 42}rem`;
    }
    const pixels = width?.match(/^(\d+(?:\.\d+)?)px$/);
    const cap = Math.min(intrinsicWidth, pixels ? Number(pixels[1]) : Infinity);
    return `(max-width: 45rem) min(calc(100vw - 3rem), ${cap}px), min(42rem, ${cap}px)`;
}
