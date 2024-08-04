export default function Loadermain(){
    return (
        <div
        className={` fixed inset-0 flex flex-col justify-center items-center bg-custom-gradient backdrop-blur-md z-50`} style={{
          backgroundColor:"#00000033",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <img src="/loader.gif" alt="loader" className="max-w-[200px]"/>
      </div>
    );
}