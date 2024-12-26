import pokeTypes from "./pokeTypes";

const gameTurn = (pokes, target, attribute) => {
  const response = {
    comparedPokes: [],
    announcerMessage: null,
    gameOver: false,
  };

  let comparisonFunction;
  let attrCustomMessage = {};

  if (
    [
      "immune_to",
      "resistant_to",
      "weak_to",
      "super_effective_to",
      "not_effective_to",
      "type",
    ].includes(attribute.name)
  ) {
    const dmg_to = (poke) =>
      poke.types.reduce(
        (accumulator, currentValue) =>
          pokeTypes[accumulator.type.name].dmg_to[attribute.value] *
          pokeTypes[currentValue.type.name].dmg_to[attribute.value]
      );
    const dmg_from = (poke) =>
      poke.types.reduce(
        (accumulator, currentValue) =>
          pokeTypes[accumulator.type.name].dmg_from[attribute.value] *
          pokeTypes[currentValue.type.name].dmg_from[attribute.value]
      );

    switch (attribute.name) {
      case "type":
        comparisonFunction = (poke) =>
          poke.types.some((e) => e.type.name === attribute.value);
        attrCustomMessage.singular = "é do tipo ";
        attrCustomMessage.plural = "são do tipo";
        break;
      case "immune_to":
        comparisonFunction = (poke) => (dmg_from(poke) === 0 ? true : false);
        attrCustomMessage.singular = "é imune a dano do tipo ";
        attrCustomMessage.plural = "são imunes a dano do tipo ";
        break;
      case "resistant_to":
        comparisonFunction = (poke) =>
          dmg_from(poke) > 0 && dmg_from(poke) < 1 ? true : false;
        attrCustomMessage.singular = "é resistente a dano do tipo ";
        attrCustomMessage.plural = "são resistentes a dano do tipo ";
        break;
      case "weak_to":
        comparisonFunction = (poke) => (dmg_from(poke) > 1 ? true : false);
        attrCustomMessage.singular = "tem fraqueza a dano do tipo ";
        attrCustomMessage.plural = "têm fraqueza a dano do tipo ";
        break;
      case "super_effective_to":
        comparisonFunction = (poke) => (dmg_to(poke) > 1 ? true : false);
        attrCustomMessage.singular =
          "dá dano super efetivo contra Pokémons do tipo ";
        attrCustomMessage.plural =
          "dão dano super efetivo contra Pokémons do tipo ";
        break;
      case "not_effective_to":
        comparisonFunction = (poke) =>
          dmg_to(poke) > 0 && dmg_to(poke) < 1 ? true : false;
        attrCustomMessage.singular =
          "dá dano pouco efetivo contra Pokémons do tipo ";
        attrCustomMessage.plural =
          "dão dano pouco efetivo contra Pokémons do tipo ";
        break;
    }

    attrCustomMessage.singular +=
      attribute.selectedOptions[0].innerText.toLowerCase();
    attrCustomMessage.plural +=
      attribute.selectedOptions[0].innerText.toLowerCase();
  } else {
    comparisonFunction = (poke) => {
      let statValue;
      if (attribute.name === "height" || attribute.name === "weight") {
        statValue = poke[attribute.name] / 10;
      } else {
        statValue = poke.stats.find(
          (element) => element.stat.name === attribute.name
        ).base_stat;
      }
      return (
        statValue >= parseFloat(attribute.value.split("_")[0]) &&
        statValue < parseFloat(attribute.value.split("_")[1])
      );
    };

    attrCustomMessage.singular =
      "tem " +
      (attribute.name === "hp"
        ? "vida"
        : attribute.name === "attack"
        ? "ataque"
        : attribute.name === "defense"
        ? "defesa"
        : attribute.name === "speed"
        ? "velocidade"
        : attribute.name === "height"
        ? "altura"
        : "peso") +
      " >= ";

    attrCustomMessage.plural =
      "têm " +
      (attribute.name === "hp"
        ? "vida"
        : attribute.name === "attack"
        ? "ataque"
        : attribute.name === "defense"
        ? "defesa"
        : attribute.name === "speed"
        ? "velocidade"
        : attribute.name === "height"
        ? "altura"
        : "peso") +
      " >= ";

    attrCustomMessage.singular +=
      parseFloat(attribute.value.split("_")[0]) +
      (parseFloat(attribute.value.split("_")[1]) === Infinity
        ? ""
        : " e < " + parseFloat(attribute.value.split("_")[1]));

    attrCustomMessage.plural +=
      parseFloat(attribute.value.split("_")[0]) +
      (parseFloat(attribute.value.split("_")[1]) === Infinity
        ? ""
        : " e < " + parseFloat(attribute.value.split("_")[1]));
  }

  let pokePodeAbaixar = false;
  let pokesAbaixados, msg;

  if (comparisonFunction(target)) {
    response.comparedPokes = pokes.map((poke) => {
      if (comparisonFunction(poke)) {
        return { ...poke };
      } else {
        pokePodeAbaixar = true;
        return { ...poke, visible: false };
      }
    });

    pokesAbaixados =
      response.comparedPokes.filter((poke) => !poke.visible).length -
      pokes.filter((poke) => !poke.visible).length;

    msg = `O Pokémon Misterioso ${attrCustomMessage.singular}!\n`;
    if (pokesAbaixados > 0) {
      msg +=
        `${pokesAbaixados} Pokémo${pokesAbaixados > 1 ? "ns" : "n"} ` +
        `não tinh${pokesAbaixados > 1 ? "am" : "a"} essa característica ` +
        `e fo${pokesAbaixados > 1 ? "ram" : "i"} abaixad${
          pokesAbaixados > 1 ? "os" : "o"
        }. `;
      msg += pokesAbaixados > 5 ? "Arrasou! 😄" : "Boa! 😄";
    } else if (pokePodeAbaixar) {
      msg +=
        "Porém os Pokémons que seriam abaixados já estavam abaixados. Que pena! 😞";
    } else {
      msg += `Porém todos os outros Pokémons também ${attrCustomMessage.plural}. Nenhum Pokémon foi abaixado desta vez. Que pena! 😞`;
    }
  } else {
    response.comparedPokes = pokes.map((poke) => {
      if (comparisonFunction(poke)) {
        pokePodeAbaixar = true;
        return { ...poke, visible: false };
      } else {
        return { ...poke };
      }
    });

    pokesAbaixados =
      response.comparedPokes.filter((poke) => !poke.visible).length -
      pokes.filter((poke) => !poke.visible).length;

    msg = `O Pokémon Misterioso não ${attrCustomMessage.singular}.\n`;
    if (pokesAbaixados > 0) {
      msg += "Porém " + pokesAbaixados + " ";
      msg +=
        `Pokémo${pokesAbaixados > 1 ? "ns" : "n"} ` +
        `tinh${pokesAbaixados > 1 ? "am" : "a"} essa característica ` +
        `e fo${pokesAbaixados > 1 ? "ram" : "i"} abaixad${
          pokesAbaixados > 1 ? "os" : "o"
        }. `;
      msg += pokesAbaixados > 5 ? "Arrasou! 😄" : "Boa! 😄";
    } else if (pokePodeAbaixar) {
      msg +=
        "Que pena! 😞 Os Pokémons que seriam abaixados já estavam abaixados.";
    } else {
      msg += `Todos os outros Pokémons também não ${attrCustomMessage.plural}. Nenhum Pokémon foi abaixado desta vez. Que pena! 😞`;
    }
  }

  const pokesLevantados = response.comparedPokes.filter(
    (poke) => poke.visible
  ).length;
  response.announcerMessage =
    pokesLevantados === 1
      ? [
          "Parabéns! 😄 Você ganhou! O Pokémon Misterioso era o " +
            target.speciesName +
            ". Se quiser jogar novamente, clique no botão Reiniciar.",
          msg,
        ]
      : msg;
  response.gameOver = pokesLevantados === 1;

  return response;
};

export default gameTurn;
