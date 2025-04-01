import { Octokit } from 'octokit';

export type Repo = {
  name: string;
  url: string;
  description: string | null;
};

if (!import.meta.env.PAT) {
  throw new Error('PAT is not set');
}
const octokit = new Octokit({ auth: import.meta.env.PAT });

async function getRecentRepos(
  username: string,
  repoCount: number,
): Promise<Repo[]> {
  const repos = await octokit.rest.repos.listForUser({
    username,
    sort: 'pushed',
    per_page: repoCount,
  });

  const denyList = ['yuma140902.github.io'];

  const repoList: Repo[] = [];
  for (const repo of repos.data) {
    if (denyList.includes(repo.name)) {
      continue;
    }
    repoList.push({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
    });
  }

  return repoList;
}

export const repos = await getRecentRepos('yuma140902', 7);
export const currentDate = new Date().toISOString().split('T')[0];
