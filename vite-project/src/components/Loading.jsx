import Loadings from "../assets/images/180-ring-with-bg.svg"

export default function Loading(){
    return(
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center ">
            <img src={Loadings} alt="" width={100} />
        </div>
    )
}