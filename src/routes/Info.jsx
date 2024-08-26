import { useContext } from "react";
import { StarContext } from "./Brawlstar.jsx";
import {useNavigate} from "react-router-dom";

export default function Info(){

  const { name, url, description} = useContext(StarContext);

  const navigate = useNavigate();

  return (
      <div className={"text-white text-shadow px-5 relative w-full h-[15rem] flex flex-col gap-3 items-start"}>
        <h2 className={"text-2xl lilita-one-regular"}>{name}</h2>
        <p className={"text-xl text-wrap"}>{description || "This Channel has no description."}</p>
        {url &&
            <a
                href={url}
                className={"hover:scale-[105%] active:scale-[95%]"}
                target={"_blank"}
            >
              Go to {name}&#39;s channel!
            </a>
        }
        <div
          onClick={() => navigate("edit")}
        >
          <img
            src={'/src/assets/editor-logo.png'}
            alt={'editor-logo'}
            className={"w-[3rem] h-[3rem] cursor-pointer absolute bottom-0 select-none hover:scale-[105%] active:scale-[95%]"}
          />
        </div>
      </div>
  )
}