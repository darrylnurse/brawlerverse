import {useContext, useState} from "react";
import { StarContext } from "./Brawlstar.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {supabase} from "../database.js";

export default function Edit(){

  const { name, url, description } = useContext(StarContext);

  const navigate = useNavigate();

  const { id} = useParams();

  const [star, setStar] = useState({
    name: name,
    url: url,
    description: description,
  });

  const handleChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    setStar(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const updateStar = async event => {
    event.preventDefault();

    if(star.name.length <= 0){
      alert("Please put at LEAST a name.");
      return;
    }

    await supabase
        .from("brawlstars")
        .update({
          name: star.name,
          url: star.url,
          description: star.description,
        })
        .eq('id', id);

    navigate("../");
  }

  const deleteStar = async event => {
    event.preventDefault();

    const confirmation = confirm(`You are about to delete ${name}. Proceed?`);
    if(!confirmation) return;

    await supabase
        .from("brawlstars")
        .delete()
        .eq('id', id);

    navigate("/");
  }

  const labelStyle = "lilita-one-regular text-white text text-shadow text-xl";
  const inputStyle = "min-h-[2rem] rounded-md pl-3 shadow-sm shadow-black";

  return (
      <form className={"text-black text-shadow px-5 h-full w-full flex flex-row justify-between items-center"}>
        <div className={"w-1/2 flex flex-col"}>
          <div className={"flex flex-col gap-1 w-full"}>
            <label htmlFor={"name"} className={labelStyle}>
              Name
            </label>
            <input
                type={"text"}
                name={"name"}
                onChange={handleChange}
                autoComplete={'off'}
                className={inputStyle}
                defaultValue={name}
            />
          </div>

          <div className={"flex flex-col gap-1 w-full"}>
            <label htmlFor={"description"} className={labelStyle}>
              Description
            </label>
            <input
                type={"text"}
                name={"description"}
                onChange={handleChange}
                autoComplete={'off'}
                className={inputStyle}
                defaultValue={description}
            />
          </div>

          <div className={"flex flex-col gap-1 w-full"}>
            <label htmlFor={"url"} className={labelStyle}>
              Url
            </label>
            <input
                type={"text"}
                name={"url"}
                onChange={handleChange}
                autoComplete={'off'}
                className={inputStyle}
                defaultValue={url}
            />
          </div>
        </div>
        <div className={"flex flex-col gap-4 pt-5"}>
          <div className={"flex justify-center items-center"}>
            <input
                type="submit"
                value="Update"
                onClick={updateStar}
                className={"hover:scale-[105%] active:scale-[95%] transition-transform cursor-pointer font-bold text-white text-shadow lilita-one-regular select-none bg-orange-400 shadow-md shadow-black py-2 px-24 rounded-md"}
            />
          </div>

          <div className={"flex justify-center items-center"}>
            <input
                type="submit"
                value="Cancel"
                onClick={() => navigate("../")}
                className={"hover:scale-[105%] active:scale-[95%] transition-transform cursor-pointer font-bold text-white text-shadow lilita-one-regular select-none bg-yellow-300 shadow-md shadow-black py-2 px-24 rounded-md"}
            />
          </div>

          <div className={"flex justify-center items-center"}>
            <input
                type="submit"
                value="Delete"
                onClick={deleteStar}
                className={"hover:scale-[105%] active:scale-[95%] transition-transform cursor-pointer font-bold text-white text-shadow lilita-one-regular select-none bg-red-500 shadow-md shadow-black  py-2 px-24 rounded-md"}
            />
          </div>
        </div>
      </form>
  )
}