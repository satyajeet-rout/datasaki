import React from "react";
import Login from "./pages/login";
import Registration from "./pages/registration";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from "./components/DashboardLayout";
import MlopsSolution from "./containers/Mlops-Solution/DataPreparation";
import Dashboard from "./containers/Dashboard";
import Extensions from "./containers/Extensions";
import Plugins from "./containers/Plugins";
import Connection from "./containers/Connection";
import UserProfileGroups from "./containers/Users-Profile-Groups";
import SubscriptionPlan from "./containers/SubscriptionPlan";
import Settings from "./containers/Settings";
import Visualization from "./containers/Mlops-Solution/Visualization";
import CreateDataFlow from "./pages/data-flow/create-data-flow";
import ChatBot from "./components/ChatBot";

import DataCatalog from "./containers/Mlops-Solution/Visualization/Catalog";
import Explore from "./components/Explore";
// import ChatBot from "./components/chatbot/ChatBot";


function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<DashboardLayout />}>
                        <Route path="" element={<Dashboard />} />
                        <Route path="mlops-solution/data-preparation" element={<MlopsSolution />} />
                        <Route path="mlops-solution/visualization" element={<Visualization />} />
                        <Route path="/mlops-solution/visualization/catalog" element={<DataCatalog />} />
                        <Route path="extensions" element={<Extensions />} />
                        {/* <Route path="chatbot" element={<ChatBot />} /> */}
                        <Route path="chatbot" element={<Explore />} />
                        <Route path="plugins" element={<Plugins />} />
                        <Route path="connection" element={<Connection />} />
                        <Route path="user-profile-group" element={<UserProfileGroups />} />
                        <Route path="subscription-plan" element={<SubscriptionPlan />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/create-data-flow" element={<CreateDataFlow />} />
                </Routes>

            </Router>

        </div>
    );
}

export default App;
