import './App.scss';
import './App.scss'
import Header from './components/Header/Header';
import { Link } from 'react-router-dom';

const App = () => {

  return (
    <div className="app-container">
      <Header />
      Hello
      <button>
        <Link to='/admins'>Go to Admin</Link>
      </button>
      <button>
        <Link to='/users'>Go to User</Link>
      </button>
    </div>
  );
}
export default App;
