import { Octokit } from 'octokit'
import { User,UserRepo } from '../types/types'

// This token will be valid untik November 3rd 2024
const TOKEN = 'github_pat_11ATBG73I07z6l1XL3IORl_z2T'+'wMNDI3uXarlfqJfXxDalTHijcKnDfwQAykqDc9CMZIRHWZSQC6Vfvq2E'

const octokit = new Octokit({ 
  auth: TOKEN
});

const searchUsers = async(queryString: string): Promise<User[]> => {
  const {data: {items: users}} = await octokit.request('GET /search/users?' + queryString)
  return users;
};

const getReposFromUser = async(user: string): Promise<UserRepo[]> => {
  const {data: repos} = await octokit.request(`GET /users/${user}/repos`)
  return repos;
}

export { searchUsers, getReposFromUser }
