import React, { useEffect, useRef, useState } from "react";
import "../Styles/App.css";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";
import Typed from "typed.js";

export default function InputBox() {
  const [value, setvalue] = useState("");
  const [copied, setCopied] = useState(false);
  const [isEnable, setEnable] = useState(true);
  const [alertSuccess, setalertSuccess] = useState(false);
 
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Short URL','Free','Fast','Unlimited',""],
      typeSpeed: 50,
    });
  
    return () => {
      typed.destroy();
    }
  }, []);
  

  const btnHandler = () => {
    if (value.includes("http") || value.includes("www")) {
      setEnable(false);
      axios
        .get(
          `https://api.shrtco.de/v2/shorten?url=${value}/very/long/link.html`
        )
        .then((res) => setvalue(res.data.result.short_link));
        setalertSuccess(true);
    } else {
      
      setvalue("");
    }
  };
  const copyHandler = (()=>{
    alert("Copied to clipboard");
    setalertSuccess(false);
    setEnable(true);
    setvalue("");
  })

  return (
    <div className="container inputBox">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-lg-12 d-flex justify-content-center ">
          <h3>URL Shortner <span className="autoType" ref={el}></span> </h3>
          
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-sm-6 col-lg-7">
          <input
            className="form form-control  w-100"
            type="text"
            value={value}
            placeholder="E.g https://urlshortner.com"
            onChange={({ target: { value } }) => setvalue(value)}
          />
        </div>

        <div className="col-4 col-sm-2 col-lg-1 sub-phn">
          <button
            className="btn btn-primary"
            onClick={btnHandler}
            title="Shorten the URL"
          >
            Shorten
          </button>
        </div>
        <div className="col-4 col-sm-2 col-lg-1 copy-phn">
          <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
            <button
              className="btn btn-primary"
              disabled={isEnable}
              title="Copy to clipboard"
              onClick={copyHandler}
            >
              Copy
            </button>
          </CopyToClipboard>
        </div>
      </div>
      {alertSuccess ? (
        <div class="alert alert-success mt-3" role="alertSuccess">
          URL shorten in Successfull ! Click Copy button to Copy!
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
