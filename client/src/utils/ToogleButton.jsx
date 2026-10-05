import { useState } from "react"
import { LuChevronRight } from "react-icons/lu"

function ToogleButton({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="list-none">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer hover:text-text-primary select-none w-max"
      >
        <LuChevronRight
          className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
        />
        <span className="font-medium">{title}</span>
      </div>

      {isOpen && (
        <div className="ml-6 mt-2 flex flex-col gap-3 animate-fade-in">
          {children}
        </div>
      )}
    </li>
  );
}

export default ToogleButton
