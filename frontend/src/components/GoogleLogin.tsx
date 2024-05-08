import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { VITE_GOOGLE_CLIENT_ID } from "../constants/envVariables";

interface UserData {
  id: string;
  name: string;
  picture: string;
  credential: string;
}

function Google() {
  const [userData, setUserData] = useState<UserData | {}>({});

  function handleCallbackResponse(response: UserData) {
    const userObject = jwtDecode(response.credential);
    setUserData(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut() {
    setUserData({});
    document.getElementById("signInDiv").hidden = false;
    document.getElementById("signOutButton").hidden = true;
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: VITE_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <>
      <div id="signInDiv" style={{ padding: "0", marginRight: "30px" }}></div>
      <div>
        {Object.keys(userData).length !== 0 && (
          <button
            id="signOutButton"
            style={{ margin: "10px", borderRadius: "8px" }}
            onClick={handleSignOut}
          >
            Sign out from Google
          </button>
        )}
        {Object.keys(userData).length !== 0 && (
          <div>
            <img src={userData.picture} alt="..." />
            <h3 className="card-title">{userData.name}</h3>
          </div>
        )}
      </div>
    </>
  );
}

export default Google;
