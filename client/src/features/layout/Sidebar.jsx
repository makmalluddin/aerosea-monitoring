import { useState, useEffect } from "react"
import { TbLetterU } from "react-icons/tb";
import { LuGlobe, LuPlane, LuShip, LuUserRound } from "react-icons/lu";

function Sidebar() {
  return (
    <div className="flex flex-col h-dvh w-12 items-center justify-between">
      <div className="flex flex-col text-xl gap-15 mt-15">
        <TbLetterU className="text-xl" />
        <div className="flex flex-col gap-5">
          <LuGlobe />
          <LuShip />
          <LuPlane />
        </div>
      </div>
      <div className="mb-15">
        <LuUserRound />
      </div>
    </div>
  )
}

export default Sidebar
