import logo from "../assets/Images/Group 1.svg"
export default function Loader() {
  return (
    <>
        <div className="w-full h-lvh bg-amber-50 flex justify-center items-center">
            <div className="animate-ping">
                <img src={logo} className="scale-200"></img>
            </div>
        </div>
    </>
  )
}
