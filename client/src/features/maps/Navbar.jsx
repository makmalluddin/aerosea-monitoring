import { useEffect, useState } from "react"

function Navbar() {
  const [type, setType] = useState('ship');
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    setInterval(() => {
      const time = new Date()
      setTime(time.toLocaleTimeString('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour12: false
      }))
    }, 1000)
  })

  return (
    <div className="flex flex-none h-12 w-full bg-primary items-center justify-between">
      <div className="flex items-center mx-5">
        Aerosea Monitoring
        <div className="flex ml-5 items-center">
          <button onClick={() => setType('ship')}
            className={`border border-black ${(type === 'ship') ? "bg-orange-200" : "bg-gray-300"} cursor-pointer`}
          >
            Ship
          </button>
          <button onClick={() => setType('aircraft')}
            className={`border border-black ${(type === 'aircraft') ? "bg-orange-200" : "bg-gray-300"} hover:cursor-pointer`}
          >
            Aircraft
          </button>
        </div>
      </div>

      <div className="flex mr-5">
        {time} WIB
      </div>
    </div>
  )
}

export default Navbar
