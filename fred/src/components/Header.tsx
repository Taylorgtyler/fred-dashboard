import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import {Bars3Icon} from "@heroicons/react/24/outline";

interface HeaderProps {
  toggleSidebar: () => void;
}

function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="flex justify-between items-center px-6 py-2 bg-gray-800 shadow-md mb-2">
      <div className="flex items-center gap-4 text-white">
        <button onClick={toggleSidebar}>
          <Bars3Icon className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-white rounded-md p-2">
          US Economic Dashboard
        </h1>
      </div>
      
      <div className="flex gap-4">
        <a 
          href="https://www.linkedin.com/in/taylor-tyler-932349158/" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-600 transition-colors"
        >
          <UserPlusIcon className="h-6 w-6" />
        </a>
        <a 
          href="https://taylorgtyler.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-600 transition-colors"
        >
          <GlobeAltIcon className="h-6 w-6" />
        </a>
      </div>
    </header>
  );
}

export default Header;
