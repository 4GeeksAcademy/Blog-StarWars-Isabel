// src/layout.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { FavoriteProvider } from "./store/FavoriteContext.js";
import { CharacterDetails } from "./component/CharacterDetails.jsx"; 
import { Planets } from "./component/Planets.jsx";
import { PlanetDetails } from "./component/PlanetDetails.jsx";
import { VehicleDetails } from "./component/VehicleDetails.jsx";


const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <FavoriteProvider>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/demo" element={<Demo />} />
                            <Route path="/single/:theid" element={<Single />} />
                            <Route path="*" element={<h1>Not found!</h1>} />
                            <Route path="/character/:id" element={<CharacterDetails />} />
                            <Route exact path="/" element={<Planets/>} />
                            <Route path="/planet/:id" element={<PlanetDetails />} />
                            <Route path="/Vehicle/:id" element={<VehicleDetails />} />
                        </Routes>
                        <Footer />
                    </FavoriteProvider>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);