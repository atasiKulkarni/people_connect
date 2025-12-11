import { useNavigate } from "react-router-dom";
import { Image } from "../../../../utility/Image";

export const Login = () => {
  const navigation = useNavigate();
  const GoToDashboard = () => {
    
    navigation("./dashboard");
  };
  return (
    <div className="grid grid-cols-8 gap-4 w-full h-screen bg-white">
      <div className="col-span-5 w-full h-full flex flex-col justify-center items-center pt-5">
        <p className="text-[#FEBE10] text-[Rubik] text-base font-semibold absolute top-6 left-100">
          PEOPLE
        </p>
        <img src={Image.connect} className="w-40 object-contain" />
        <img src={Image.working} className="w-full h-150 object-contain" />
      </div>

      <div className="col-span-3 text-black text-xl w-full h-full px-20 flex flex-col justify-center items-center">
        <img src={Image.peopleConnect} className="w-50  object-contain" />
        <p className="text-black font-[Rubik] text-2xl font-normal mt-5">
          Single sign on
        </p>
        <p className="text-black font-[Rubik] text-sm font-normal mt-2">
          Sign in with your identity provider
        </p>

        <div
          className="text-black font-[Rubik] text-sm font-normal border border-gray-100 w-full p-3 rounded mt-5 shadow-sm cursor-pointer"
          onClick={GoToDashboard}
        >
          SSO Login
        </div>
      </div>
    </div>
  );
};
