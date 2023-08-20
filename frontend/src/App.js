import './App.css';
import { Route, Routes } from "react-router-dom";
import Guest from './components/Routes/Guest';
import PrivateRoute from './components/Routes/Private';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';

function App() {

  return (
    <div className="App">
      <Routes>

        <Route
          path="/"
          element={
            <Guest>
              <HomePage />
            </Guest>
          }
        />

        <Route
          path='/chats'
          element=
          {
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        >

        </Route>

      </Routes>
    </div>
  );
}

export default App;
