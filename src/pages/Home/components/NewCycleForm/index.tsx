import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export function NewCycleForm() {
  return (
    <FormContainer>
    <label htmlFor="task">Vou trabalhar em</label>
    <TaskInput
      id="task"
      list="task-suggestions"
      placeholder="Dê um nome para o seu projeto"
      disabled={!!activeCycle} // if has a value, then its true, if not, then its false
      {...register("task")}
    />

    <datalist id="task-suggestions">
      <option value="Projeto 1" />
      <option value="Projeto 2" />
      <option value="Projeto 3" />
      <option value="Banana" />
    </datalist>

    <label htmlFor="">durante</label>
    <MinutesAmountInput
      type="number"
      id="durationAmount"
      placeholder="00"
      step={5}
      min={1}
      max={60}
      disabled={!!activeCycle} // if has a value, then its true, if not, then its false
      {...register("minutesAmount", { valueAsNumber: true })}
    />

    <span>minutos.</span>
  </FormContainer>
  )
}