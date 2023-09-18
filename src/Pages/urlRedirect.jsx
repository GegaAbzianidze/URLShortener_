import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../SupabaseClient";

const URLRedirect = () => {
  const { shortURLlink } = useParams();

  useEffect(() => {
    const getURL = async () => {
      const { data, error } = await supabase
        .from("URL")
        .select()
        .eq("ShortURL", shortURLlink)
      if (error) {
        console.log(error.message);
      }
      if (data) {
        // redirect to the URL
        console.log(data);
        window.location = data[0].RealURL;
      }
    };
    getURL();
    console.log(shortURLlink);
  }, [shortURLlink]);
  return (
    <div className="Loading__">
      <Icon icon="svg-spinners:wind-toy" className="Loading__icon__"/>
    </div>
  );
};

export default URLRedirect;
