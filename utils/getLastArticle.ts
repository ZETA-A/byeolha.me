export default async function getLastArticle(): Promise<string> {
    const owner = 'ZETA-A';
    const repo = 'byeolha.me';

    const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits`
    );
    const commits = await res.json();
    const lastCommitTime: string = commits[0]?.commit?.author?.date;

    if (!lastCommitTime) {
        return '2004-12-04';
    }

    console.log(lastCommitTime);

    return lastCommitTime;
}
