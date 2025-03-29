export default function removeMD(content: string, slice: number): string {
    const result = content.replace(
        /^\s+|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|_([^_]+)_|\[[^\]]+\]\([^\)]+\)|!\[[^\]]*\]\([^\)]+\)|`[^`]+`|```[\s\S]*?```|^([*-]|\d+\.)\s[^\n]*|^#+\s[^\n]*|[\r\n]+/gm,
        (match, p1, p2, p3, p4) => {
            // 볼드 텍스트는 마크업만 제거하고 텍스트는 그대로 유지
            if (p1 || p2) {
                return p1 || p2; // 볼드 마크업 내 텍스트만 반환
            }
            return ''; // 나머지 마크다운 문법은 삭제
        }
    );
    return result.slice(0, slice).concat('...');
}
