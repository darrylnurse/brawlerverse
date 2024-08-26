import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AsideContext} from "../Root.jsx";

// eslint-disable-next-line react/prop-types
export default function BrawlCard({ id, name, description, imageUrl }){

  console.log(imageUrl);

  const DESCRIPTION_CUTOFF = 100;

  // crop desc
  const cropDescription = description => {
    if(typeof description !== "string") return description;
    // eslint-disable-next-line react/prop-types
    if(description.length >= DESCRIPTION_CUTOFF) {
      // eslint-disable-next-line react/prop-types
      return description.slice(0, DESCRIPTION_CUTOFF) + " ...";
    }
    return description;
  }

  const navigate = useNavigate();

  const setAsideOpen = useContext(AsideContext);

  const handleClick = () => {
    navigate(`/star/${id}`);
    if(typeof setAsideOpen === "function"){
      setAsideOpen(false);
    }
  }

  return (
      <div
        className={"hover:scale-[101%] active:scale-[99%] cursor-pointer select-none relative h-[20rem] rounded-md overflow-hidden"}
        onClick={handleClick}
      >
        <img
            src={imageUrl || "/assets/spikey.jpg"}
            alt={"brawlstar-image"}
            className={"w-full h-full object-cover"}
        />
        <div className={"absolute top-0 left-0"}>
          <h2 className={"bg-white m-2 p-1 rounded-md font-bold"}>
            {name}
          </h2>
        </div>
        <div className={"absolute bottom-0 left-0"}>
          { description &&
              <p className={"bg-white m-2 p-1 rounded-md"}>
                {cropDescription(description)}
              </p>
          }
        </div>
      </div>
  )
}