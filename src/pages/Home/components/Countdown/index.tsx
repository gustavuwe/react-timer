import { useContext, useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../..";

export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished } = useContext(CyclesContext);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        ); // calculates diference in seconds between now and the start date, because timeout can be not accurate

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();

          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval); // removes the previous interval, to prevent conflicts or bugs
    };
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished]);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60); // round to the nearest minute that is less
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0"); // padStart to ensure that the minutes are always 2 digits, e.g 9 -> 09
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
