import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";
import { TbLetterU } from "react-icons/tb";
import { LuGrid2X2, LuPlane, LuShip, LuUserRound } from "react-icons/lu";

function Sidebar() {
  const getButtonClass = ({ isActive }) => {
    return `p-2 cursor-pointer rounded-md ${isActive ? 'bg-surface-color border border-border-color' : 'bg-bg-color'}`
  }

  return (
    <div className="flex flex-col h-dvh w-12 items-center bg-bg-color justify-between py-5">
      <div className="flex flex-col text-xl gap-15 mt-15">
        <TbLetterU className="text-xl mx-auto text-text-primary" />
        <div className="flex flex-col gap-6">

          <NavLink to='/' className={getButtonClass} title='Dashboard'>
            <LuGrid2X2 />
          </NavLink>

          <NavLink to='/ship' className={getButtonClass} title='Ship'>
            <LuShip />
          </NavLink>

          <NavLink to='/aircraft' className={getButtonClass} title='Aircraft'>
            <LuPlane />
          </NavLink>
        </div>
      </div>
      <div className="mb-15">
        <NavLink to='/user' className={getButtonClass} title='User'>
          <LuUserRound />
        </NavLink>
      </div>
    </div >
  )
}

export default Sidebar
