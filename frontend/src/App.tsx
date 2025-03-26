import "./App.css";
import { publicRouter } from "./routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                {publicRouter.map((route, index) => (
                    <Route
                        path={route.path}
                        element={route.element}
                        key={index}
                    >
                        {route.children &&
                            route.children.map((child, childIndex) => (
                                <Route
                                    key={childIndex}
                                    path={child.path}
                                    element={
                                        child.Component ? (
                                            <child.Component />
                                        ) : (
                                            child.element
                                        )
                                    }
                                />
                            ))}
                    </Route>
                ))}
            </Routes>
        </Router>
    );
}

export default App;
