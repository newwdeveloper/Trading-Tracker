import { useNavigate } from "react-router-dom";
import noProject from "../assets/no-projects.png";

const NoDisplayPage = () => {
  const navigate = useNavigate();
  const handleNavToInputPage = () => {
    navigate("/inputField");
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <img
          className="w-60 h-60 object-cover"
          src={noProject}
          alt="no project"
        />
        <p className="text-lg">
          Taken a trade? 📈... Click ADD NEW TRADE to journal your success and
          keep track of every move!
        </p>
        <button
          onClick={handleNavToInputPage}
          className="bg-orange-400 p-2 rounded-xl active:bg-orange-700 hover:bg-orange-300"
        >
          ADD NEW TRADE
        </button>
      </div>
    </div>
  );
};

export default NoDisplayPage;
