import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import background from '../Background.jpg';
function App() {
  return (
    <>
    <div className= {`bg-cover bg-center min-h-[100vh]  bg-[url(${background})]`}>
    <BrowserRouter>
      <NavBar/>
    </BrowserRouter>
    </div>
    </>
  );
}

export default App;