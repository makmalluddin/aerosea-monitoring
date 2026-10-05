import { NavLink } from "react-router-dom";
import { TbLetterU } from "react-icons/tb";
import { LuGrid2X2, LuPlane, LuShip, LuInfo } from "react-icons/lu";
import { RiRadarFill } from "react-icons/ri";
import { useMonitoring } from "../../services/MonitoringContext";

function Sidebar() {
  const { resetPlayback } = useMonitoring();
  const getButtonClass = ({ isActive }) => {
    return `p-2 cursor-pointer rounded-md ${isActive ? 'bg-surface-color border border-border-color' : 'bg-bg-color'}`
  }

  return (
    <div className="flex flex-col h-dvh w-14 items-center bg-bg-color justify-between py-5 border-r border-border-color">
      <div className="flex flex-col text-xl gap-15 mt-15">
        <RiRadarFill className="text-xl mx-auto text-text-primary" />
        <div className="flex flex-col gap-6">

          <NavLink to='/' className={getButtonClass} title='Dashboard' onClick={resetPlayback}>
            <LuGrid2X2 />
          </NavLink>

          <NavLink to='/ship' className={getButtonClass} title='Ship' onClick={resetPlayback}>
            <LuShip />
          </NavLink>

          <NavLink to='/aircraft' className={getButtonClass} title='Aircraft' onClick={resetPlayback}>
            <LuPlane />
          </NavLink>
        </div>
      </div>
      <div className="flex mb-15">
        <NavLink to='/about' className={getButtonClass} title='about'>
          <LuInfo className="text-xl" />
        </NavLink>
      </div>
    </div >
  )
}

export default Sidebar
