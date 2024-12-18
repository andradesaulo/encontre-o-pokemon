import { useState } from "react";
import SelectInput from "./SelectInput";

const Form = (props) => {
  const [selectInputs, setSelectInputs] = useState([
    { name: "hp", disabled: false },
    { name: "attack", disabled: false },
    { name: "defense", disabled: false },
    { name: "speed", disabled: false },
    { name: "height", disabled: false },
    { name: "weight", disabled: false },
    { name: "type", disabled: false },
    { name: "immune_to", disabled: false },
    { name: "resistant_to", disabled: false },
    { name: "weak_to", disabled: false },
    { name: "super_effective_to", disabled: false },
    { name: "not_effective_to", disabled: false },
  ]);

  const handleSelectChange = (event) => {
    if (event.target.value !== "") {
      setSelectInputs(
        selectInputs.map((input) => {
          return input.name !== event.target.name
            ? { ...input, disabled: true }
            : input;
        })
      );
    } else {
      setSelectInputs(
        selectInputs.map((input) => {
          return input.name !== event.target.name
            ? { ...input, disabled: false }
            : input;
        })
      );
    }
  };
  return (
    <form
      className="guessInterface"
      onSubmit={
        props.gameOver
          ? (e) => {
              e.preventDefault();
              props.handleReset();
            }
          : (e) => {
              e.preventDefault();
              if (!props.gameOver) {
                const submittedAttr = props.handleSubmit(e, selectInputs);

                setSelectInputs(
                  selectInputs.map((input) =>
                    input.name === submittedAttr
                      ? { ...input, asked: true }
                      : { ...input, disabled: false }
                  )
                );
              }
            }
      }
    >
      {selectInputs.map((input, i) => (
        <SelectInput
          key={i}
          attribute={input.name}
          handleChange={handleSelectChange}
          disabled={
            input.asked || props.gameOver || props.isRisking
              ? true
              : input.disabled
          }
        />
      ))}
      <button
        type="submit"
        disabled={
          selectInputs.filter((input) => input.asked).length === 12 ||
          props.isRisking
            ? true
            : false
        }
      >
        {props.gameOver ? "Reiniciar" : "Chutar atributo"}
      </button>
      <button
        type="button"
        onClick={props.handleRisk}
        disabled={props.gameOver ? true : false}
        className={props.isRisking ? "buttonRisking" : ""}
      >
        Arriscar Pokemon
      </button>
    </form>
  );
};

export default Form;
