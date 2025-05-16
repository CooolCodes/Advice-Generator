import { useState } from "react";
import divider from "../../public/assets/images/pattern-divider-mobile.svg";
import desktopDivider from "../../public/assets/images/pattern-divider-desktop.svg";
import dice from "../../public/assets/images/icon-dice.svg";

const URL = "https://api.adviceslip.com/advice";

const getRandomAdvice = async () => {
  const response = await fetch(URL);

  const body = await response.json();
  return body.slip;
};

const AdviceBox = () => {
  const [adviceId, setAdviceId] = useState();
  const [advice, setAdvice] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Screen size detection
    const screenQuery = window.matchMedia("(max-width: 767px)");

    const handleChange = () => {
      setIsMobile(screenQuery.matches);
    };

    screenQuery.addListener(handleChange);

    return () => {
      screenQuery.removeListener(handleChange);
    };
  }, []);
  const getBackgroundImage = () => {
    if (isMobile) {
      return isMobile ? divider : desktopDivider;
    }
  };

  const getAdvice = async () => {
    const adviceData = await getRandomAdvice();
    setAdviceId(adviceData.id);
    setAdvice(adviceData.advice);
  };
  return (
    <div className="bg-[hsl(218,23%,16%)] h-dvh pt-20 lg:pt-50">
      <div className=" bg-[hsl(217,19%,24%)] flex flex-col justify-center items-center gap-6 m-auto p-4 rounded-md w-[90%] lg:w-[40%]">
        <h1 className="text-[hsl(150,100%,66%)]"> Advice #{adviceId}</h1>
        <p className="text-2xl text-[hsl(193,38%,86%)] text-center">
          "{advice}"
        </p>
        <div
          className={`bg-[url(${divider})] w-full h-auto bg-no-repeat bg-center lg:bg-[(${desktopDivider}))] lg:h-auto lg:w-full`}
          style={{ backgroundImage: `url(${getBackgroundImage()})` }}
        ></div>
        <button
          onClick={getAdvice}
          className="bg-[hsl(150,100%,66%)] p-4 rounded-full cursor-pointer hover:shadow-[1px_1px_15px_6px_rgb(82_255_168_/_1)] relative top-10"
        >
          <img src={dice} alt="dice" />
        </button>
      </div>
    </div>
  );
};

export default AdviceBox;
