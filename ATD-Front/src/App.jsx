import { useEffect} from "react";
import { initFlowbite} from "flowbite";
import Header from './Header/Header.jsx'
import Home from './Home/Home.jsx'
import Footer from './Footer/Footer.jsx'

function App() {

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
