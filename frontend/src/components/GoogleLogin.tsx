import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { UserData } from "types/UserData";

function Google() {
  const [userData, setUserData] = useState<UserData | null>(null);

  function handleCallbackResponse(response: UserData) {
    const userObject: UserData = jwtDecode(response.credential);
    setUserData(userObject);

    const signInDiv = document.getElementById("signInDiv");
    if (signInDiv) {
      signInDiv.hidden = true;
    }
  }

  function handleSignOut() {
    setUserData(null);
    const signInDiv = document.getElementById("signInDiv");
    if (signInDiv) {
      signInDiv.hidden = false;
    }
    const signOutButton = document.getElementById("signOutButton");
    if (signOutButton) {
      signOutButton.hidden = true;
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    const signInDiv = document.getElementById("signInDiv");

    if (signInDiv) {
      signInDiv.addEventListener("click", () => {});

      google.accounts.id.renderButton(signInDiv, {
        theme: "outline",
        size: "large",
      });
    }
  }, []);

  return (
    <>
      <div id="signInDiv" style={{ padding: "0", marginRight: "30px" }}></div>
      <div>
        {userData && (
          <button
            id="signOutButton"
            style={{ margin: "10px", borderRadius: "8px" }}
            onClick={handleSignOut}
          >
            Sign out from Google
          </button>
        )}
        {userData && (
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
