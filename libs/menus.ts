import { LayoutDashboard, ListTodoIcon } from "lucide-react";

export const menuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    key: "todos",
    label: "Add Todos",
    icon: ListTodoIcon,
    path: "/dashboard/todos",
  },
];

export default menuItems;
