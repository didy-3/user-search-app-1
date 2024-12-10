import './App.scss'
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch, useAppSelector } from './utils/hooks';
import { Search } from './components/Search'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { UserItem } from './components/UserItem';
import { Card } from './components/Card';
import { setCardOpen } from './store/main';
import { setCurUser } from './store/users';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const loading = useAppSelector((state) => state.main.loading);
  const cardOpen = useAppSelector((state) => state.main.cardOpen);
  const users = useAppSelector((state) => state.users.users);
  const curUser = useAppSelector((state) => state.users.curUser);
  const dispatch = useAppDispatch()
  function onCardClose(){
    dispatch(setCardOpen(false))
    dispatch(setCurUser(null))
  }
  return (
    <div className='app-wrapper'>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {
          loading ?
            <div className='loader'>
              <CircularProgress size="200px" />
            </div>
            : ''
        }

        <div className="page-content">
          <Search />
          <div className='user-list-wrapper'>
            <header className='user-item-wrapper'>              
              <div className="item-data col-id">Id</div>
              <div className="item-data">Name</div>
              <div className="item-data">Email</div>
              <div className="item-data">Phone</div>
              <div className="item-data">Website</div>
              <div className="item-data">Username</div>
            </header>
            {
              users.length==0?'':
              users.map((it,i)=>
                <UserItem user={it} key={i} />
              )
            }
          </div>
          { curUser==null? '' :
            <Card open={cardOpen} onClose={onCardClose} user={curUser} />
          }
        </div>
      </ThemeProvider>
    </div>
  )
}

export default App
