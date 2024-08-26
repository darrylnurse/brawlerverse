import {useState} from "react";
import {supabase} from "../database.js";
import {useNavigate} from "react-router-dom";

export default function Create(){

  const navigate = useNavigate();

  const [star, setStar] = useState({
    name: "",
    url: "",
    description: "",
    imageUrl: "",
    bannerUrl: ""
  });

  const createStar = async event => {
    event.preventDefault();

    if(star.name.length <= 0){
      alert("Please put at LEAST a name.");
      return;
    }

    await supabase
        .from("brawlstars")
        .insert({...star})
        .select();

    navigate("/");
  }

  const handleChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    setStar(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const labelStyle = "lilita-one-regular text-white text text-shadow text-xl";
  const inputStyle = "min-h-[3rem] rounded-md pl-3 shadow-sm shadow-black";

  return (
      <div className={"flex flex-col justify-center overflow-scroll no-scrollbar h-full items-center gap-3"}>
        <div className={"lilita-one-regular text-white text-2xl text-shadow"}>
          Shine the light on a new Brawl STAR!
        </div>
        <form className={"flex flex-col gap-3 w-1/2"}>

          <div className={"flex flex-row w-full gap-3"}>
            <div className={"flex flex-col gap-1 w-1/2"}>
              <label htmlFor={"name"} className={labelStyle}>
                Name
              </label>
              <input
                  type={"text"}
                  name={"name"}
                  onChange={handleChange}
                  autoComplete={'off'}
                  className={inputStyle}
                  placeholder={"What is their name?"}
              />
            </div>

            <div className={"flex flex-col gap-1 w-1/2"}>
              <label htmlFor={"url"} className={labelStyle}>
                Url
              </label>
              <input
                  type={"text"}
                  name={"url"}
                  onChange={handleChange}
                  autoComplete={'off'}
                  className={inputStyle}
              />
            </div>
          </div>

          <div className={"flex flex-col gap-1"}>
            <label htmlFor={"description"} className={labelStyle}>
              Description
            </label>
            <textarea
                name={"description"}
                onChange={handleChange}
                autoComplete={'off'}
                className={"min-h-[3rem] rounded-md p-2 shadow-sm shadow-black"}
                placeholder={"Describe this Content Creator."}
            />
          </div>

          <div className={"flex flex-row gap-3"}>
            <div className={"flex flex-col gap-1 w-1/2"}>
              <label htmlFor={"imageUrl"} className={labelStyle}>
                Avatar Url
              </label>
              <input
                  type={"text"}
                  name={"imageUrl"}
                  onChange={handleChange}
                  autoComplete={'off'}
                  className={inputStyle}
              />
            </div>

            <div className={"flex flex-col gap-1 w-1/2"}>
              <label htmlFor={"bannerUrl"} className={labelStyle}>
                Banner Url
              </label>
              <input
                  type={"text"}
                  name={"bannerUrl"}
                  onChange={handleChange}
                  autoComplete={'off'}
                  className={inputStyle}
              />
            </div>
          </div>

          <div className={"flex mt-3 justify-center items-center h-1/4"}>
            <input
                type="submit"
                value="Submit"
                onClick={createStar}
                className={"hover:scale-[105%] active:scale-[95%] shadow-md shadow-black transition-transform cursor-pointer font-bold lilita-one-regular select-none bg-white py-3 px-24 rounded-md"}
            />
          </div>

        </form>
      </div>
  )
}