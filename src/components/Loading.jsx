
export default function Loading(){
  return (
      <div className={"w-full h-full flex flex-col justify-center items-center"}>
        <img
          src={"/src/assets/mortis-spinner.png"}
          alt={"mortis-spinner"}
          className={"load-spinner w-[10rem] h-[10rem]"}
        />
        <p className={"text-2xl font-bold text-white text-shadow text-center"}>Loading...</p>
      </div>
  )
}