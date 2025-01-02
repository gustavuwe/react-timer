import { createContext, useContext } from "react";

const CyclesContext = createContext({
  activeCycle: 5,
});

function NewCycleForm() {
  let { activeCycle } = useContext(CyclesContext);

  return (
    <h1>
      NewCycleForm: {activeCycle}
      <button
        onClick={() => {
          activeCycle = 2;
        }}
      >
        Alterar ciclo ativo
      </button>
    </h1>
  );
}

function Countdown() {
  const { activeCycle } = useContext(CyclesContext);

  return <h1>Countdown: {activeCycle}</h1>;
}

export function Home() {
  return (
    <div>
      <NewCycleForm />
      <Countdown />
    </div>
  );
}
