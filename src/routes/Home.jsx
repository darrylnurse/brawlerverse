import { useState, useEffect } from "react";
import { supabase } from "../database.js";
import BrawlCard from "../components/BrawlCard.jsx";
import Loading from "../components/Loading.jsx";

export default function Home () {
  const [brawlstars, setBrawlstars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrawlStars = async () => {
      const { data, error } = await supabase
          .from("brawlstars")
          .select()
          .order('created_at', { ascending: true });

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setBrawlstars(data);
      }
      setLoading(false);
    };

    fetchBrawlStars().catch(error => {
      console.error("Error fetching brawlstars:", error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
      <div className="grid h-full no-scrollbar grid-cols-4 overflow-scroll overflow-x-hidden p-3 w-full gap-3">
        {brawlstars && brawlstars.length > 0 ? (
            brawlstars.map((brawlstar) => (
                <BrawlCard
                    key={brawlstar.id}
                    id={brawlstar.id}
                    name={brawlstar.name}
                    description={brawlstar.description}
                    imageUrl={brawlstar.imageUrl}
                />
            ))
        ) : (
            <div className="w-full text-3xl h-full col-span-4 flex justify-center items-center font-bold text-white">
              There are no brawl stars. :(
            </div>
        )}
      </div>
  );
}
