import { useState } from "react";
import { Image } from "../../../../utility/Image";
import { IoMdClose } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { selectEmployee } from "../../../Employee/slice/EmployeeSlice";
import { getInitials } from "../../../../utility/Initials";
import { selectEvent } from "../../../Events/slice/EventSlice";
import type { EventItem } from "../../../Events/model/EventModel";

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
}

export const NoticeBoard = () => {
  const employeeList = useSelector(selectEmployee);
  const eventList = useSelector(selectEvent) as
    | {
        birthdays?: EventItem[];
        anniversaries?: EventItem[];
        leaves?: EventItem[];
      }
    | never;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [show, setShow] = useState(false); // Controls the main modal visibility
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [appreciationMessage, setAppreciationMessage] = useState("");

  const filteredEmployees = employeeList.filter(
    (empList) =>
      empList.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empList.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle employee selection from the search results
  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    setSearchTerm(""); // Clear search bar once selected
    // We now wait for the message input
  };

  // Handle closing the modal entirely
  const handleCloseModal = () => {
    setShow(false);
    setSelectedEmployee(null); // Reset selected employee on close
    setSearchTerm("");
    setAppreciationMessage("");
  };

  return (
    <div className="col-span-2 w-full">
      <div className="bg-white my-5 rounded-lg shadow-md h-50 ">
        <div className=" flex flex-col px-5 pt-5">
          <p className="text-black font-[Rubik] font-medium text-sm">
            Appreciate Your Colleagues!!
          </p>
          <div className="flex flex-row items-center mt-4">
            <img
              src={Image.recommendation}
              className="w-20 h-20 object-contain"
            />
            <div>
              <p className="text-gray-700 font-[Rubik] font-normal text-sm m-2">
                Express gratitude and acknowledgment to your colleagues.
              </p>
              <div
                className="border border-blue-600 rounded-sm p-1 mx-2 cursor-pointer"
                onClick={() => setShow(true)}
              >
                <p className="text-blue-600 font-[Rubik] font-normal text-sm text-center">
                  Appreciate Now
                </p>
              </div>

              {show && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-end z-50">
                  <div className="bg-white p-6  shadow-lg relative max-w-lg w-full ">
                    <button
                      onClick={handleCloseModal}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
                    >
                      <IoMdClose className="w-5 h-5 object-contain" />
                    </button>
                    <div className="border-b border-gray-300 pb-4">
                      <p className="text-[#005DAC] font-[Rubik] text-lg font-medium">
                        Let's Appreciate !
                      </p>
                    </div>

                    <div className="w-full mt-4">
                      {!selectedEmployee ? (
                        <>
                          <p className="text-gray-500 font-[Rubik] text-sm font-normal">
                            Who would you like to appreciate?
                          </p>
                          <input
                            type="text"
                            placeholder="Search Employee.."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full placeholder-gray-400 focus:outline-none text-sm text-gray-600 border border-gray-300 rounded p-2 mt-3"
                          />

                          {/* Display Filtered Results */}
                          {searchTerm && filteredEmployees.length > 0 && (
                            <div className="mt-2 border border-gray-200 rounded max-h-40 overflow-y-auto bg-white">
                              {filteredEmployees.map((employee) => (
                                <div
                                  key={employee.id}
                                  onClick={() => handleEmployeeSelect(employee)}
                                  className="p-3 cursor-pointer hover:bg-gray-100 flex items-center border-b border-gray-100"
                                >
                                  {employee.profile_picture ? (
                                    <img
                                      src={`${baseUrl}${employee.profile_picture}`}
                                      alt={employee.first_name}
                                      className="h-10 w-10 object-cover rounded-full"
                                    />
                                  ) : (
                                    <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">
                                      <p className="font-[Runik] text-sm font-medium text-black">
                                        {getInitials(
                                          `${employee.first_name} ${employee.last_name}`
                                        )}
                                      </p>
                                    </div>
                                  )}

                                  <span className="text-gray-800 ml-3">
                                    {employee.first_name} {employee.last_name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {searchTerm && filteredEmployees.length === 0 && (
                            <div className="mt-3 text-gray-500 text-sm">
                              No employees found.
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex flex-row justify-between items-center mb-3">
                            <p className="text-gray-600 font-[Rubik] text-base font-medium ">
                              Express gratitude to {selectedEmployee.first_name}{" "}
                              {selectedEmployee.last_name}
                            </p>
                            <button
                              onClick={() => setSelectedEmployee(null)}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              Change recipient
                            </button>
                          </div>

                          <div className="flex items-center border border-gray-300 rounded-lg p-2">
                            <input
                              type="text"
                              placeholder={`Send appreciation note to ${selectedEmployee.first_name}...`}
                              value={appreciationMessage}
                              onChange={(e) =>
                                setAppreciationMessage(e.target.value)
                              }
                              className="w-full focus:outline-none text-sm text-gray-600"
                            />
                            <button
                              onClick={() => {
                                console.log(
                                  `Sending message to ${selectedEmployee.first_name}: ${appreciationMessage}`
                                );
                                handleCloseModal();
                              }}
                              className="bg-[#005DAC] w-8 h-8 rounded-full flex items-center justify-center ml-3 p-2 hover:bg-blue-700 disabled:bg-gray-400"
                              disabled={!appreciationMessage.trim()}
                            >
                              <RiSendPlaneFill
                                className="w-5 h-5"
                                color="white"
                              />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ********************* */}
      <div className=" bg-white rounded-lg shadow-md h-auto">
        <div className=" flex flex-col px-5 pt-5">
          <p className="text-black font-[Rubik] font-medium text-sm">
            Milestones and Events
          </p>

          <p className="text-gray-500 font-[Rubik] font-normal text-sm my-2">
            Today
          </p>

          {/* Birthdays */}
          {eventList.birthdays &&
            eventList.birthdays.map((event) => (
              <div key={event.first_name} className="flex items-center mb-4">
                {event.profile_picture ? (
                  <img
                    src={`${baseUrl}${event.profile_picture}`}
                    alt={event.first_name}
                    className="h-10 w-10 object-cover rounded-full"
                  />
                ) : (
                  <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">
                    <p className="font-[Runik] text-sm font-medium text-black">
                      {getInitials(`${event.first_name} ${event.last_name}`)}
                    </p>
                  </div>
                )}
                <div className="ml-3">
                  <p className="flex flex-col">
                    <span className="font-medium text-black text-sm font-[Rubik]">
                      {event.first_name} {event.last_name}
                    </span>
                    <span className="font-normal text-gray-600 text-xs font-[Rubik]">
                      Birthday
                    </span>
                  </p>
                </div>
              </div>
            ))}

          {/* Anniversaries */}
          {eventList.anniversaries &&
            eventList.anniversaries.map((event) => (
              <div key={event.first_name} className="flex items-center mb-4">
                {event.profile_picture ? (
                  <img
                    src={`${baseUrl}${event.profile_picture}`}
                    alt={event.first_name}
                    className="h-10 w-10 object-cover rounded-full"
                  />
                ) : (
                  <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">
                    <p className="font-[Runik] text-sm font-medium text-black">
                      {getInitials(`${event.first_name} ${event.last_name}`)}
                    </p>
                  </div>
                )}
                <div className="ml-3">
                  <p className="flex flex-col">
                    <span className="font-medium text-black text-sm font-[Rubik]">
                      {event.first_name} {event.last_name}
                    </span>
                    <span className="font-normal text-gray-600 text-xs font-[Rubik]">
                      Work Anniversary
                    </span>
                  </p>
                </div>
              </div>
            ))}

          {!eventList.birthdays?.length && !eventList.anniversaries?.length && (
            <p className="text-gray-500 font-[Rubik] text-sm text-center py-4">
              No events today.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
