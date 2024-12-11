import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleHomePage = () => {
    navigate("/");
  };
  return (
    <div className="text-5xl bg-slate-500 p-3 text-gray-300 text-center">
      <h1 onClick={handleHomePage} className="cursor-pointer hover:text-white">
        Trading Journal
      </h1>
    </div>
  );
};

export default Header;
