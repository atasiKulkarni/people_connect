
import React, { useState, useMemo } from 'react';
import type { EmployeeList } from '../../model/EmployeeModel';
import { getInitials } from '../../../../utility/Initials';
// Define the shape of the props this component expects
interface PaginatedTableProps {
  data: EmployeeList[]; // Expects an array of Banner objects
}

const itemsPerPage = 10; // Number of items per page

// Use the interface for the component props
export const PaginatedTable: React.FC<PaginatedTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Use useMemo to calculate which items should be shown on the current page
  // Specify the return type of the memoized value: Banner[]
  const currentItems: EmployeeList[] = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [currentPage, data]);

  const handlePageChange = (pageNumber: number) => { // Type the pageNumber argument
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Define the base URL for images
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <div className="mt-5">

      {/* --- Table Rendering --- */}
      <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Employee ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Designation</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Department Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Email ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Mobile Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Office Location</th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
             
              <td className="px-6 py-4 whitespace-nowrap text-black">
                <div className='flex items-center'>
                {item.profile_picture ? (
                      <img 
                          src={`${baseUrl}${item.profile_picture}`} 
                          alt={item.first_name} 
                          className="h-10 w-10 object-cover rounded-full" 
                      />
                  ):
                  (
                    <div className='bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center'>
                    <p className='font-[Runik] text-sm font-medium text-black'>
                    {getInitials(`${item.first_name} ${item.last_name}`)} 
                      </p>
                  </div>
                  )}
                 
                   <p className="text-black ml-2">{item.first_name} {item.last_name}</p>
                </div>
               
                </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{item.employee_id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{item.designation}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{item.department}</td>
              <td className="px-6 py-4 text-black">{item.email}</td>
              <td className="px-6 py-4 text-black">{item.mobile}</td>
              <td className="px-6 py-4 text-black">{item.office_location}</td>
           
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- Pagination Controls --- */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50 text-black"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md disabled:opacity-50 text-black"
        >
          Next
        </button>
      </div>
    </div>
  );
};
