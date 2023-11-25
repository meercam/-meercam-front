const App = () => {
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
            <h3 className="text-xl pb-2 font-semibold">실시간 영상</h3>
            <div className="w-full h-[380px] bg-gray-400 rounded-md"></div>
          </div>
          <div className="bg-white rounded-md p-6">
            <h3 className="text-xl pb-2 font-semibold">CCTV 리스트</h3>
            <div className="w-full flex items-start gap-4">
              {['공원1', '공원2', '행사장1'].map((elem) => (
                <button className="w-36 h-10 flex items-center justify-center rounded-md border border-gray-300">
                  <span className="text-lg">{elem}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-80 bg-white rounded-md p-6">
          <h3 className="text-xl pb-4 font-semibold">Alert Log</h3>
          <div className="">
            
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
