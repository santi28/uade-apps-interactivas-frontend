import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("bookings", "routes/bookings.tsx"),
  route("book", "routes/book.tsx"),
  route("admin", "routes/admin.tsx"),
] satisfies RouteConfig;
