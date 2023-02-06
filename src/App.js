import logo from './logo.svg';
import RedditWindow from './RedditWindow.js';
import { BrowserRouter as  Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <button onClick={()=> document.body.classList.toggle("night")}>nightmode</button>
        <Routes>
          <Route exact path="/" element={<RedditWindow/>}/>
        </Routes>
    </Router>
  );
}

export default App;
