import { useState, useEffect } from "react"
import { TbLetterU } from "react-icons/tb";
import { LuGlobe, LuPlane, LuShip, LuUserRound } from "react-icons/lu";

function Sidebar() {
  const [mode, setMode] = useState('Dashboard')

  return (
    <div className="flex flex-col h-dvh w-12 items-center bg-bg-color justify-between">
      <div className="flex flex-col text-xl gap-15 mt-15">
        <TbLetterU className="text-xl" />
        <div className="flex flex-col gap-2">
          <button onClick={() => setMode('Dashboard')}
            className={`p-2 cursor-pointer rounded-md ${mode === 'Dashboard' ? 'bg-surface-color border border-border-color' : 'bg-bg-color'}`}>
            <LuGlobe />
          </button>

          <button onClick={() => setMode('Ship')}
            className={`p-2 cursor-pointer rounded-md ${mode === 'Ship' ? 'bg-surface-color border border-border-color' : 'bg-bg-color'}`}>
            <LuShip />
          </button>

          <button onClick={() => setMode('Aircraft')}
            className={`p-2 cursor-pointer rounded-md ${mode === 'Aircraft' ? 'bg-surface-color border border-border-color' : 'bg-bg-color'}`}>
            <LuPlane />
          </button>
        </div>
      </div>
      <div className="mb-15">
        <button onClick={() => setMode('User')}
          className={`p-2 cursor-pointer rounded-md ${mode === 'User' ? 'bg-surface-color border border-border-color' : 'bg-bg-color'}`}
        >
          <LuUserRound />
        </button>
      </div>
    </div >
  )
}

export default Sidebar
