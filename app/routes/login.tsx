import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dr. Osvaldo - Login Sistema" },
    { name: "description", content: "Sistema de turnos para Dr. Osvaldo" },
  ];
}

export default function Login() {
  return (
    <>
      <span>Login Page - Under Construction</span>
    </>
  );
}
