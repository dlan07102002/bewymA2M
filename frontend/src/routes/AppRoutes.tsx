import { Navigate, useRoutes } from "react-router-dom";
import StudentManagement from "../pages/HomePage";
import StudentDetail from "../pages/StudentDetail";

const AppRoutes = () => {
    const routes = useRoutes([
        { path: "/", element: <StudentManagement /> },
        { path: "/:id", element: <StudentDetail /> },

        {
            path: "*", // Đường dẫn wildcard cho các trang không tồn tại
            element: <Navigate to="/404.html" replace />, // Điều hướng đến trang 404.html
        },
    ]);

    return routes;
};

export default AppRoutes;
