import React, { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";
import { Icon } from "@iconify/react";

const HomePage = () => {
  const [shortened, setShortened] = useState(false);
  const [shortURL, setShortURL] = useState(null);
  const [copy, setCopy] = useState(false);

  const randomString = (length) => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = length; i > 0; i--) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  const generateUniqueShortURL = async () => {
    let uniqueShortURL = null;
  
    while (!uniqueShortURL) {
      const shortURL = randomString(5);
      const { data, error } = await supabase
        .from("URL")
        .select("ShortURL")
        .eq("ShortURL", shortURL);
  
      if (error) {
        alert(error.message);
        return null;
      }
  
      if (data.length === 0) {
        uniqueShortURL = shortURL; // Unique short URL found
      }
    }
  
    return uniqueShortURL;
  };

  const handleShortener = async (e) => {
    e.preventDefault();
    const realURL = e.target.url.value;
    if (!realURL) {
      alert("Please enter a URL");
      return;
    }

    const uniqueShortURL = await generateUniqueShortURL();

    if (uniqueShortURL !== null) {
      const { error } = await supabase.from("URL").insert([{ RealURL: realURL, ShortURL: uniqueShortURL }]);

      if (error) {
        alert(error.message);
      } else {
        setShortened(true);
        setShortURL(uniqueShortURL);
      }
    }
  };

  const handleURLCopy = () => {
    navigator.clipboard.writeText(`http://localhost:5173/${shortURL}`);
    setCopy(true);
  };

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    }
  }, [copy]);

  return (
    <div className="Container__">
      <h1 className="Title__">URL Shortener</h1>
      {shortened ? (
        <div className="Finish__link__">
          <div className="Result__Form__">
            <h1>Link:</h1>
            <a
              className="Link__"
              href={`http://localhost:5173/${shortURL}`}
              target="_blank"
              rel="noreferrer"
            >
              localhost:5173/{shortURL}
            </a>
            <button className="Copy__" onClick={handleURLCopy}>
              <Icon icon="carbon:copy" className="Icon__" />
            </button>
          </div>
          {copy && (
            <div className="Success__copy__">
              <Icon icon="carbon:copy" className="Icon__Done__" />
              Link has been copied to the clipboard
            </div>
          )}
        </div>
      ) : (
        <form className="Form__" onSubmit={handleShortener}>
          <label htmlFor="url" className="URL__">
            URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            placeholder="https://example.com"
            required
            className="Input__"
          />
          <button type="submit" className="Button__">
            Shorten
          </button>
        </form>
      )}
    </div>
  );
};

export default HomePage;
