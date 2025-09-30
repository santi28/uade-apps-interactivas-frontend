import type { TabButtonProps } from "../../types/admin";

export const TabButton = ({ active, onClick, children, icon }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
      active
        ? 'bg-blue-600 text-white shadow-md'
        : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200'
    }`}
  >
    {icon}
    <span>{children}</span>
  </button>
);