import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dr. Osvaldo - Sistema de Citas" },
    { name: "description", content: "Página de inicio del sistema de turnos" },
  ];
}

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Fondo con imagen — reemplazá bg-home.jpg cuando la subas */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "Url('uade-apps-interactivas-frontend/app/imagenes/tiro-medio-sonriente-hombre-vestido-con-abrigo.jpg')" }}
      ></div>

      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-2xl text-center text-white px-6">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenido al sistema de citas del Dr. Osvaldo
        </h1>
        <p className="text-lg mb-6">
          Aquí podrá gestionar sus turnos médicos de manera rápida, sencilla y
          segura. Ingrese a su cuenta para comenzar.
        </p>
        <a
          href="/login"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors"
        >
          Ir al Login
        </a>
      </div>
    </div>
  );
}
