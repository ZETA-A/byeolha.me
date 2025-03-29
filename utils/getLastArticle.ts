export default async function getLastArticle(
    owner: string,
    repo: string
): Promise<string> {
    const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits`
    );
    const commits = await res.json();
    const lastCommitTime: string = commits[0]?.commit?.author?.date;

    if (!lastCommitTime) {
        return '2004-12-04';
    }

    return lastCommitTime;
}
