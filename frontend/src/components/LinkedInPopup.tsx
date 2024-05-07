import { useEffect, useRef, useState } from "react";
import axios from "axios";
const EventSource = window.EventSource;
import signInLinkedin from "../assets/signInLinkedin.png";

function LinkedIn() {
  const [userData, setUserData] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/subscribe");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "linkedinUserData") {
        setUserData(data.userData);
      }
    };
    eventSource.onerror = (error) => {
      console.error("Error:", error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleOAuthLogin = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/linkedin");

      const popupWidth = 600;
      const popupHeight = 800;
      const left = (window.innerWidth - popupWidth) / 2;
      const top = (window.innerHeight - popupHeight) / 2;

      const popup = window.open(
        response.data.redirectUrl,
        "oauthWindow",
        `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
      );

      if (!popup) {
        alert("Popup blocked! Please enable popups and try again.");
        return;
      }
      document.getElementById("linkedin-login-button").hidden = true;

      popupRef.current = popup;
    } catch (error) {
      console.error("OAuth login failed:", error);
    }
  };

  useEffect(() => {
    if (userData && popupRef.current) {
      popupRef.current.close();
    }
  }, [userData]);

  function handleSignOut() {
    setUserData(null);
    document.getElementById("linkedin-login-button").hidden = false;
  }

  return (
    <div>
      <button
        id="linkedin-login-button"
        onClick={handleOAuthLogin}
        style={{
          margin: "10px 25px 10px 10px",
          padding: 0,
          border: 0,
          height: "41px",
        }}
      >
        <img src={signInLinkedin} alt="Login with LinkedIn" />
      </button>
      <div>
        {userData && (
          <button
            id="signOutButton"
            style={{ margin: "10px", borderRadius: "8px" }}
            onClick={(event) => handleSignOut(event)}
          >
            Sign out from LinkedIn
          </button>
        )}
        {userData && (
          <div>
            <img src={userData.picture} alt="..." />
            <h3>{userData.name}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default LinkedIn;
