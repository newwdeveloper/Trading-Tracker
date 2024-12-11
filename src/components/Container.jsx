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
      <div className="flex">
        <SideBar />
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
