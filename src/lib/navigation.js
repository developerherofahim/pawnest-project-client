import {
  LayoutDashboard,
  PawPrint,
  HeartHandshake,
  PlusCircle,
  List,
} from "lucide-react";

export const dashboardLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Requests",
    href: "/dashboard/my-request",
    icon: HeartHandshake,
  },
  {
    title: "Add Pet",
    href: "/dashboard/add-pet",
    icon: PlusCircle,
  },
  {
    title: "My Listings",
    href: "/dashboard/my-listing",
    icon: List,
  },

];