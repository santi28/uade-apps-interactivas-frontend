import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dr. Osvaldo - Login Sistema" },
    { name: "description", content: "Sistema de turnos para Dr. Osvaldo" },
  ];
}

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Ingreso al Sistema
        </h1>
        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white shadow hover:bg-indigo-700 transition-colors"
          >
            Ingresar
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Sistema de Turnos - Dr. Osvaldo
        </p>
      </div>
    </div>
  );
}
