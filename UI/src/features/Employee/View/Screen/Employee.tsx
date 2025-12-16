

import { useDispatch, useSelector } from 'react-redux';
import { CiSearch } from "react-icons/ci";
import { PaginatedTable } from "../component/PaginatedTable";
import { useEffect } from "react";
import type { AppDispatch } from '../../../../redux/store';
import { selectEmployee, selectEmployeeStatus } from '../../slice/EmployeeSlice';
import { fetchEmployee } from '../../action/EmployeeAction';
import { Navbar } from '../../../Dasboard/View/Components/Navbar';


export const Employee = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employeeList = useSelector(selectEmployee);
    const status = useSelector(selectEmployeeStatus);
console.log("employeeList-->",employeeList)

  useEffect(() => {
    // Only dispatch if status is 'idle'
    if (status === "idle") {
      dispatch(fetchEmployee());
    }
  }, [status, dispatch]);

  return (
    <>
      <Navbar />
      <div className="p-5 bg-white h-full">
        <p className="font-[Rubik] text-black text-large font-medium">
          Employee Directory
        </p>

        <div className="col-span-3 text-black flex items-center bg-white/10 w-100 rounded-md p-2 h-10 content-center border border-gray-300 mt-5">
          <CiSearch className="w-6 h-6 " color="black" />
          <input
            type="text"
            placeholder="Search by Employee Name"
            className="w-full placeholder-gray-600 focus:outline-none text-sm text-white ml-2"
          />
        </div>

        <PaginatedTable data={employeeList} />

      </div>
    </>
  );
};
