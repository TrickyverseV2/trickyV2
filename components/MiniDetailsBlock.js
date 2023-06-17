import React from "react";

const MiniDetailsBlock = (props) => {
  return (
    <div className="">
      <div
        // style={{
        //   background: `linear-gradient(90deg, ${"light" + props.color}, ${
        //     props.color
        //   })`,
        // }sty

        style={{
          backgroundColor: props.bgColor ? props.bgColor : "#2f363e",
        }}
        className={` drop-shadow-md mb-[1rem]  shadow-md  /1border-t-2 /1border-b-2  /border-[rgba(255,255,255,0.3)] ${
          //   props.color == "blue"
          //     ? "from-blue-400"
          //     : props.color == "orange"
          //     ? "from-orange-400"
          //     : props.color == "pink"
          //     ? "from-pink-400"
          //     : props.color == "green"
          //     ? "from-green-400"
          //     : ""
          // } ${
          //   props.color == "blue"
          //     ? "to-blue-900"
          //     : props.color == "orange"
          //     ? "to-orange-900"
          //     : props.color == "pink"
          //     ? "to-pink-900"
          //     : props.color == "green"
          //     ? "to-green-900"
          //     : ""
          " "
        } /p-2 w-[30vw] h-[9rem] rounded-xl rounded-t-md`}
      >
        {/* {console.log(props.color)} */}
        <div
          style={{ backgroundColor: props.color }}
          className={`w-full h-3  rounded-t-md`}
        ></div>
        <div className="flex flex-row text-4xl w-full h-full px-4 gap-[0.2rem] items-center justify-between pr-[4vh]">
          <div className="flex flex-col">
            <h3
              className="text-[50px] mb-0.5 pl-1 transition-all duration-300"
              style={{ fontFamily: "varela round" }}
            >
              {props.data.split(" ")[0]}
            </h3>
            <h3
              style={{
                color: props.textColor ? props.textColor : "rgb(209,213,219)",
              }}
              className="text-[17px]  tracking-wider font-[400] /text-gray-300"
            >
              {props.data
                .split(" ")
                .slice(1, props.data.split(" ").length)
                .join(" ")}
            </h3>
          </div>
          {props.icon && typeof props.icon == "function" && props.icon()}
        </div>
      </div>
    </div>
  );
};

export default MiniDetailsBlock;
