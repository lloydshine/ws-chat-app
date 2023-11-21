import { useState } from "react";
import { Chat, Login } from "./components";

function App() {
  const [user, setUser] = useState(null);
  return <>{!user ? <Login setUser={setUser} /> : <Chat username={user} />}</>;
}

export default App;
