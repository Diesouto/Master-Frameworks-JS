import "./App.css";
import Footer from "./components/Footer/Footer";

import Header from "./components/Header/Header";
import SeccionPruebas from "./components/SeccionPruebas/SeccionPruebas";
import Sidebar from "./components/Sidebar/Sidebar";
import Slider from "./components/Slider/Slider";

function App() {
    return (
        <div className="App">
            <Header />
            <Slider />
            <div className="center">
                <SeccionPruebas />
                <Sidebar />
                <div className="clearfix"></div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
