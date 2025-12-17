import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { PaginatedTable } from "../component/PaginatedTable";
import { useEffect, useState } from "react";
import type { AppDispatch } from "../../../../redux/store";
import {
  selectEmployee,
  selectEmployeeStatus,
} from "../../slice/EmployeeSlice";
import { fetchEmployee } from "../../action/EmployeeAction";

export const Employee = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employeeList = useSelector(selectEmployee);
  const status = useSelector(selectEmployeeStatus);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    // Only dispatch if status is 'idle'
    if (status === "idle") {
      dispatch(fetchEmployee());
    }
  }, [status, dispatch]);

  const filteredMoreApps = employeeList.filter((empList) =>
    empList.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white h-full w-full p-5 pt-20">
      <p className="font-[Rubik] text-black text-large font-medium">
        Employee Directory
      </p>

      <div className="col-span-3 text-black flex items-center bg-white/10 w-100 rounded-md p-2 h-10 content-center border border-gray-300 mt-5">
        <CiSearch className="w-6 h-6 " color="black" />
        <input
          type="text"
          placeholder="Search by Employee Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full placeholder-gray-600 focus:outline-none text-sm text-gray-500 ml-2"
        />
      </div>

      <PaginatedTable data={filteredMoreApps} />
    </div>
  );
};
