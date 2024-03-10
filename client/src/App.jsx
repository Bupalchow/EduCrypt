import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import background from '../Background.jpg';
function App() {
  return (
    <>
    <div className= {`bg-cover bg-center h-[100vh]  bg-[url(${background})] text-white bg-black`}>
    <BrowserRouter>
      <NavBar/>
    </BrowserRouter>
    </div>
    </>
  );
}

export default App;