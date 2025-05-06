import { useState } from "react";
import divider from "../../public/assets/images/pattern-divider-mobile.svg";
import dice from "../../public/assets/images/icon-dice.svg";

const URL = "https://api.adviceslip.com/advice";

const getRandomAdviceId = async () => {
  const response = await fetch(URL);

  const body = await response.json();
  return body.slip.advice;
};

const getRandomAdvice = async () => {
  const response = await fetch(URL);

  const body = await response.json();
  return body.slip;
};

const AdviceBox = () => {
  const [adviceId, setAdviceId] = useState(null);
  const [advice, setAdvice] = useState([]);

  const getAdvice = async () => {
    const adviceData = await getRandomAdvice();
    setAdviceId(adviceData.id);
    setAdvice(adviceData.advice);
  };
  return (
    <div className="bg-[hsl(218,23%,16%)] p-20">
      <div className="bg-[hsl(217,19%,24%)] flex flex-col justify-center items-center gap-6  m-auto p-4 rounded-md w-100">
        <h1 className="text-[hsl(150,100%,66%)]"> Advice #{adviceId}</h1>
        <p className="text-2xl text-[hsl(193,38%,86%)] text-center">
          "{advice}"
        </p>
        <img src={divider} alt="divider" />
        <button
          onClick={getAdvice}
          className="bg-[hsl(150,100%,66%)] p-4 rounded-full cursor-pointer hover:shadow-[1px_1px_15px_6px_rgb(82_255_168_/_1)]"
        >
          <img src={dice} alt="dice" />
        </button>
      </div>
    </div>
  );
};

export default AdviceBox;
