import type { RouteObject } from "./index";
import StudentManagement from "../pages/StudentManagement/StudentManagement";

const mainRouter: RouteObject[] = [
    {
        path: "/",
        children: [
            {
                // Student Management
                path: "/",
                Component: StudentManagement,
            },
        ],
    },
];

export default mainRouter;
