import "./App.css";
import LinkedIn from "./components/LinkedInPopup";
import Google from "./components/GoogleLogin";
import Facebook from "./components/Facebook";

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Google />
      <LinkedIn />
      <Facebook />
    </div>
  );
}

export default App;
