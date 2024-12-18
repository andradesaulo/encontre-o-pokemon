const SelectInput = ({ attribute, handleChange, disabled }) => {
  let selectValues;
  let selectNames;
  let selectPlaceholder;
  switch (attribute) {
    case "height":
      selectPlaceholder = "Altura";
      selectValues = ["0_2", "2_5", "5_Infinity"];
      selectNames = [">= 0m e < 2m", ">= 2m e < 5m", ">= 5m"];
      break;
    case "weight":
      selectPlaceholder = "Peso";
      selectValues = ["0_150", "150_300", "300_Infinity"];
      selectNames = [">= 0kg e < 150kg", ">= 150kg e < 300kg", ">= 300kg"];
      break;
    case "hp":
      selectPlaceholder = "HP";
      selectValues = ["0_50", "50_100", "100_150", "150_Infinity"];
      selectNames = [
        ">= 0 e < 50",
        ">= 50 e < 100",
        ">= 100 e < 150",
        ">= 150",
      ];
      break;
    case "attack":
      selectPlaceholder = "Ataque";
      selectValues = ["0_50", "50_100", "100_150", "150_Infinity"];
      selectNames = [
        ">= 0 e < 50",
        ">= 50 e < 100",
        ">= 100 e < 150",
        ">= 150",
      ];
      break;
    case "defense":
      selectPlaceholder = "Defesa";
      selectValues = ["0_50", "50_100", "100_150", "150_Infinity"];
      selectNames = [
        ">= 0 e < 50",
        ">= 50 e < 100",
        ">= 100 e < 150",
        ">= 150",
      ];
      break;
    case "speed":
      selectPlaceholder = "Velocidade";
      selectValues = ["0_50", "50_100", "100_150", "150_Infinity"];
      selectNames = [
        ">= 0 e < 50",
        ">= 50 e < 100",
        ">= 100 e < 150",
        ">= 150",
      ];
      break;
    default:
      selectValues = [
        "normal",
        "fighting",
        "flying",
        "poison",
        "ground",
        "rock",
        "bug",
        "ghost",
        "steel",
        "fire",
        "water",
        "grass",
        "electric",
        "psychic",
        "ice",
        "dragon",
        "dark",
        "fairy",
      ];
      selectNames = [
        "Normal",
        "Lutador",
        "Voador",
        "Venenoso",
        "Terra",
        "Pedra",
        "Inseto",
        "Fantasma",
        "Aço",
        "Fogo",
        "Água",
        "Planta",
        "Elétrico",
        "Psíquico",
        "Gelo",
        "Dragão",
        "Sombrio",
        "Fada",
      ];
      switch (attribute) {
        case "type":
          selectPlaceholder = "Tipo";
          break;
        case "immune_to":
          selectPlaceholder = "Imunidade";
          break;
        case "resistant_to":
          selectPlaceholder = "Resistência";
          break;
        case "weak_to":
          selectPlaceholder = "Fraqueza";
          break;
        case "super_effective_to":
          selectPlaceholder = "Força";
          break;
        case "not_effective_to":
          selectPlaceholder = "Não efetivo";
          break;
      }
  }
  return (
    <select
      id={attribute}
      name={attribute}
      onChange={handleChange}
      disabled={disabled}
    >
      <option value="">{selectPlaceholder}</option>
      {selectValues.map((value, i) => (
        <option value={value}>{selectNames[i]}</option>
      ))}
    </select>
  );
};

export default SelectInput;
