import {Outlet, useNavigate} from "react-router-dom";
import {createContext, useState} from "react";

export default function Root() {

  const navigate = useNavigate();
  const [asideOpen, setAsideOpen] = useState(false);
  const [spin, setSpin] = useState("");

  const handleAside = () => {
    setAsideOpen(!asideOpen);
    setSpin(asideOpen ? "spin-counter-clockwise" : "spin-clockwise");
  }

  return (
    <div className={"h-screen bg-[url('/public/assets/brawl-stars-map.jfif')] bg-cover w-screen bg-no-repeat"}>
      <div className={"p-3 gap-3 h-full w-full flex flex-row backdrop-blur-lg"}>
        <aside className={`${asideOpen ? "w-[7.5%]" : "w-[0%]"} text-white rounded-md`}>
          { asideOpen &&
            <div className={"flex flex-col"}>
              <nav className={"flex flex-col items-center text-xl justify-center w-full"}>
                <div
                    className={"cursor-pointer lilita-one-regular text-nowrap select-none p-4 hover:scale-[105%] active:scale-[95%]"}
                    onClick={() => navigate("/")}
                >
                  All Stars
                </div>
                <div
                    className={"cursor-pointer lilita-one-regular text-nowrap select-none p-4 hover:scale-[105%] active:scale-[95%]"}
                    onClick={() => navigate("/create")}
                >
                  New Star
                </div>
              </nav>
            </div>
          }
        </aside>
        <div className={`${asideOpen ? "w-[92.5%]" : "w-full"} flex flex-col`}>
          <header className={"h-[20%] w-full select-none flex relative flex-col justify-center items-center"}>
            <div
                className={"absolute left-0 top-0 m-2 w-[5rem] h-[5rem"}
                onClick={handleAside}
            >
              <img
                src={"/public/assets/brawl-logo.png"}
                alt={"brawl-logo"}
                className={`w-full h-full cursor-pointer hover:scale-[105%] active:scale-[95%] select-none ${spin}`}
              />
            </div>
            <h1 className={"text-3xl lilita-one-regular text-white"}>BRAWLER VERSE</h1>
            <p className={"text-lg lilita-one-regular text-white"}>All your favorite Brawl Stars YouTube channels!</p>
            <div className={"absolute right-0 top-0 m-6 w-[5rem] h-[5rem"}>
              <img
                  className={"w-full h-full"}
                  alt={"el-mejor"}
                  src={"/public/assets/el-primo-run.gif"}
              />
            </div>
          </header>
          <main className={"h-[80%]"}>
            <AsideContext.Provider value={setAsideOpen}>
              <Outlet/>
            </AsideContext.Provider>
          </main>
        </div>
      </div>
    </div>
  )
}

export const AsideContext = createContext(null);
