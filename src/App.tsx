import React, {} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import SelectDataSizePage from "./pages/SelectDataSizePage";
import TablePage from "./pages/TablePage";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="container py-3">
                <Switch>
                    <Route path="/select">
                        <SelectDataSizePage />
                    </Route>
                    <Route path="/table">
                        <TablePage />
                    </Route>
                    <Route path="*">
                        <Redirect to="/select" />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
        
    );
};

export default App;
