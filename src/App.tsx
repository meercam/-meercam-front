import axios from 'axios'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import AlertModal from './components/AlertModal'

const SERVER_URL = location.origin
const socket = io(SERVER_URL)

const createUrl = (ip: string) => `${SERVER_URL}/api/v1/streaming?source=${decodeURIComponent(
  `${SERVER_URL}//${ip}`
)}`

const App = () => {
  const [alerts, setAlerts] = useState([])
  const [CCTVs, setCCTVs] = useState([])
  const [curretStreamSrc, setCurrentStreamSrc] = useState('')
  const [isAlertShow, setIsAlertShow] = useState(false)

  useEffect(() => {
    axios.get(`${SERVER_URL}/api/v1/cctv`).then((res) => {
      res.data.map((elem, idx) => {
        if(idx === 0) {
          setCurrentStreamSrc(createUrl(elem.ip))
        }
        setCCTVs((prev) => [...prev, elem])
      })
    })

    socket.on('alert_listener', (message: string) => {
      setAlerts((prev) => [...prev, message])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div className="bg-gray-100 min-h-screen h-full">
      <header className="bg-white mb-6">
        <div className="max-w-6xl m-auto w-full flex items-center gap-4 py-2 px-4">
          <img
            src="/Meerkat_logo.png"
            alt="미어캣 로고"
            className="w-16 h-16 object-cover"
          />
          <h2 className="text-3xl font-semibold">Meerkat</h2>
        </div>
      </header>
      <main className="max-w-6xl m-auto w-full flex gap-6 px-4">
        <div className="flex-1 flex gap-6 flex-col">
          <div className="w-full rounded-md bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl pb-2 font-semibold">실시간 영상</h3>
              <div className="flex items-center justify-center gap-2 pb-2">
                <button
                  className="px-3.5 py-1 text-gray-700 border border-red-500 rounded-md font-semibold"
                  onClick={() => setIsAlertShow((elem) => !elem)}
                >
                  신고
                </button>
                <button className="px-3.5 py-1 text-gray-700 border border-gray-500 rounded-md">
                  이전
                </button>
                <button className="px-3.5 py-1 text-gray-700 border border-gray-500 rounded-md">
                  다음
                </button>
              </div>
            </div>
            <div className="w-full h-[380px] bg-gray-400 rounded-md">
              <img
                src={curretStreamSrc}
                className="w-full h-full object-cover"
              ></img>
            </div>
          </div>
          <div className="bg-white rounded-md p-6">
            <h3 className="text-xl pb-2 font-semibold">CCTV 리스트</h3>
            <div className="w-full flex items-start gap-4">
              {CCTVs.map((elem) => (
                <button
                  className="w-36 h-10 flex items-center justify-center rounded-md border border-gray-300"
                  onClick={async () => {
                    const streamUrlResp = await axios.get(
                      `${SERVER_URL}/api/v1/cctv/${elem.id}/stream_url`
                    )
                    const streamUrl = streamUrlResp.data
                    if (streamUrl.length != 0) {
                      setCurrentStreamSrc(createUrl(elem.ip))
                    }
                    if (elem.name === "공원2") {
                      setTimeout(() => {
                        setAlerts(prev => [...prev, "쓰러짐"])
                      }, 10000)
                    }
                  }}
                >
                  <span className="text-lg">{elem.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-80 bg-white rounded-md p-6 overflow-y-scroll">
          <h3 className="text-xl pb-4 font-semibold">Alert Log</h3>
          <div className="space-y-4">
            {alerts.map((elem) => (
              <div className="w-full h-10 flex items-center justify-center rounded-md border border-gray-300">
                <span className="text-lg">{elem}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <AlertModal isOpen={isAlertShow} setIsOpen={setIsAlertShow} />
    </div>
  )
}

export default App
