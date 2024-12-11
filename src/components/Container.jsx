import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./Header";
import DetailedPage from "./DetailedPage";
import NoDisplayPage from "./NoDisplayPage";
import SideBar from "./SideBar";
import InputContainer from "./InputContainer";

const Container = () => {
  return (
    <div>
      <Header />
      {/* Use flex-col for small screens and flex-row for larger screens */}
      <div className="flex flex-col md:flex-row">
        <SideBar className="w-full md:w-3/12" />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    children: [
      {
        index: true,
        element: <NoDisplayPage />,
      },
      {
        path: "/NoProject",
        element: <NoDisplayPage />,
      },
      {
        path: "/inputField",
        element: <InputContainer />,
      },
      {
        path: "/DetailedInfo",
        element: <DetailedPage />,
      },
    ],
  },
]);

export default appRouter;
