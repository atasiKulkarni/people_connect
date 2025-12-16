import { Navbar } from "./features/Dasboard/View/Components/Navbar";
import { Outlet } from "react-router-dom"; // Import Outlet

export const Home = () => {
  return (
    <div className="flex">
      <Navbar />

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};
