import { useEffect} from "react";
import { initFlowbite} from "flowbite";
import Header from './components/Header/Header.jsx'
import Home from './page/Home/Home.jsx'
import Footer from './components/Footer/Footer.jsx'

function App() {

    useEffect(() => {
        initFlowbite();
    }, []);

  return (
      <html>
          <body>
              <Header></Header>
              <Home></Home>
              <Footer></Footer>
          </body>
      </html>
  )
}

export default App
