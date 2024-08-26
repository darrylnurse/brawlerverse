import {Outlet, useParams} from "react-router-dom";
import {createContext, useEffect, useState} from "react";
import {supabase} from "../database.js";
import Loading from "../components/Loading.jsx";

export default function Brawlstar(){
  const { id } = useParams();

  const [star, setStar] = useState({
    id: null,
    name: "",
    url: "",
    description: "",
    imageUrl: "",
    bannerUrl: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const fetchStar = async () => {
    const {data, error} = await supabase
        .from("brawlstars")
        .select()
        .eq("id", id)
        .single();

    if(data) setStar({
      id: data['id'],
      name: data['name'],
      url: data['url'],
      description: data['description'],
      imageUrl: data['imageUrl'],
      bannerUrl: data['bannerUrl']
    })
    else console.error(error);
    setLoading(false);
   }
   fetchStar().catch(error => {
     console.error("Error fetching brawlstar:", error);
     setLoading(false);
   });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={"w-full flex flex-col rounded-lg p-4 px-[15rem] h-full"}>
      <div className={"overflow-hidden rounded-md h-[30%]"}>
        <img
            src={star.bannerUrl || "/src/assets/brawl-banner.jpg"}
            alt={"star-banner"}
            className={"w-full h-full"}
        />
      </div>
      <div className={"flex flex-row h-[70%] items-center"}>
        <div className={" flex justify-start items-center"}>
          <img
              src={star.imageUrl || "/src/assets/spikey.jpg"}
              alt={"star-image"}
              className={"h-[15rem] min-w-[17.5rem] rounded-md"}
          />
        </div>
        <div className={"w-full"}>
          <StarContext.Provider value={{
            name: star.name,
            url: star.url,
            description: star.description,
            imageUrl: star.imageUrl,
            bannerUrl: star.bannerUrl
          }}>
            <Outlet/>
          </StarContext.Provider>
        </div>
      </div>

    </div>
  )
}

export const StarContext = createContext({});