import TextField from '@mui/material/TextField'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { searchUsers, getReposFromUser } from '../service/gitHubService'
import { User, UserRepo} from '../types/types'

const DEBOUNCE_TIME = 500;
const RESULTS_PER_PAGE = 5;

function ReposExplorer() {

  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, DEBOUNCE_TIME)
  const [users, setUsers] = useState<User[]>([])
  const [reposInfo, setReposInfo] = useState<UserRepo[][]>([])
  
  const fetchData = async () => {
    if (!debouncedQuery) {
      setUsers([])
      setReposInfo([])
      return
    }
    const queryString = `q=${debouncedQuery}&per_page=${RESULTS_PER_PAGE}`
    const users = await searchUsers(queryString)
    setUsers([...users])
    const repos = await Promise.all(users.map(user => getReposFromUser(user.login)))
    setReposInfo([...repos])
  };

  useEffect(() => {
    fetchData()
  }, [debouncedQuery])

  return (
    <>
      <TextField data-cy="searchQuery" label="Enter username" variant="filled" value={query} onChange={event => setQuery(event.target.value)}/>
      {users.map((user, userIndex) => 
        <Accordion key={user.id} sx={{maxWidth: 220}} data-cy={`user${userIndex}`}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {user.login}
          </AccordionSummary>
          <AccordionDetails>
            {!!reposInfo.length && reposInfo[userIndex].map((repo, repoIndex) =>
              <Card key={repo.id} sx={{background: 'silver', margin: '10px 0'}} data-cy={`user${userIndex}repo${repoIndex}`}>
                <CardContent text-align="left">
                  <Typography variant="h6">{repo.name}</Typography>
                  <Typography variant="body2">{repo.description}</Typography>
                </CardContent>
              </Card>
            )}
          </AccordionDetails>
        </Accordion>
      )}
    </>
  )
}

export default ReposExplorer
