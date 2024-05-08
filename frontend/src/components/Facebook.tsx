import { LoginSocialFacebook, FacebookResponse } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { VITE_FB_APP_ID } from "../constants/envVariables";
import { useState } from "react";

interface UserData {
  id: string;
  name: string;
  picture: {
    data: {
      url: string;
    };
  };
}

const Facebook = () => {
  const [userData, setUserData] = useState(null);

  function handleSignOut() {
    setUserData(null);
    document.getElementById("signOutButton").hidden = true;
  }

  return (
    <>
      {!userData ? (
        <LoginSocialFacebook
          appId={VITE_FB_APP_ID}
          onResolve={(response: FacebookResponse<UserData>) => {
            console.log(response);
            setUserData(response.data);
          }}
          onReject={(error: Error) => {
            console.log(error);
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>
      ) : (
        ""
      )}
      <div>
        {userData && (
          <button
            id="signOutButton"
            style={{ margin: "10px", borderRadius: "8px" }}
            onClick={handleSignOut}
          >
            Sign out from Facebook
          </button>
        )}
        {userData && (
          <div>
            <img
              src={userData.picture.data.url}
              style={{ height: "96px", width: "96px" }}
              alt="..."
            />
            <h3 className="card-title">{userData.name}</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Facebook;
