import "./styles.css";
import styles from "./poke.module.css";
import { useState, useEffect } from "react";

import Poke from "./Poke.js";
import Form from "./Form.js";
import Announcer from "./Announcer.js";
import gameTurn from "./functions";

const App = () => {
  const [playerPokes, setPlayerPokes] = useState([]);
  const [playerPokeTarget, setPlayerPokeTarget] = useState(
    Math.floor(Math.random() * 39)
  );

  const [announcerMessages, setAnnouncerMessages] = useState([
    "Bem vindo ao jogo do Encontre o Pokémon!\n" +
      "1. Você tem 12 chutes para encontrar o Pokémon Misterioso.\n" +
      "2. Chute 1 aspecto por vez.\n" +
      "3. A qualquer momento do jogo você poderá arriscar o nome do Pokémon Misterioso, mas cuidado, você só tem 1 chance. Se errar, o jogo acaba...",
  ]);

  const [isRisking, setIsRisking] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [pokeIds, setPokeIds] = useState(() => {
    const ids = [...Array(1025).keys()];
    return [...Array(39).keys()].map(
      () => ids.splice(Math.ceil(Math.random() * ids.length), 1)[0]
    );
  });

  const [resetGame, setResetGame] = useState(false);

  useEffect(() => {
    if (resetGame) {
      setResetGame(false);
    }
  }, [resetGame]);

  const addPoke = (poke, place) => {
    setPlayerPokes((prevState) => {
      if (prevState.length === 38) {
        return [...prevState, { ...poke, visible: true, place: place }].sort(
          (pokeA, pokeB) => pokeA.place - pokeB.place
        );
      } else {
        return [...prevState, { ...poke, visible: true, place: place }];
      }
    });
  };

  const handleRisk = () => {
    if (!isRisking) {
      setAnnouncerMessages((prevState) => [
        "Para arriscar um Pokémon basta clicá-lo. Se não quiser arriscar agora, clique novamente no botão Arriscar Pokémon.",
        ...prevState,
      ]);
    }
    setIsRisking((prevState) => (prevState ? false : true));
  };

  const handlePokeRisked = (cardPlace) => {
    setPlayerPokes(
      playerPokes.map((poke) =>
        poke.place === playerPokeTarget
          ? { ...poke }
          : { ...poke, visible: false }
      )
    );
    setAnnouncerMessages((previousState) => [
      cardPlace === playerPokeTarget
        ? "Parabéns! 😄 Você ganhou! O Pokémon Misterioso era o " +
          playerPokes[playerPokeTarget].speciesName +
          ". Se quiser jogar novamente, clique no botão Reiniciar."
        : "Você escolheu o Pokémon errado! 😞 Que pena! O Pokémon Misterioso era o " +
          playerPokes[playerPokeTarget].speciesName +
          ". Se quiser reiniciar o jogo clique no botão Reiniciar.",
      ...previousState,
    ]);

    setIsRisking(false);

    setGameOver(true);
  };

  const handleReset = () => {
    setGameOver(false);
    setPokeIds(() => {
      const ids = [...Array(1025).keys()];
      return [...Array(39).keys()].map(
        () => ids.splice(Math.ceil(Math.random() * ids.length), 1)[0]
      );
    });
    setPlayerPokes([]);
    setPlayerPokeTarget(Math.floor(Math.random() * 39));
    setAnnouncerMessages([
      "Bem vindo ao jogo do Pokémon Misterioso!\n" +
        "1. Você tem 12 chutes para encontrar o Pokémon Misterioso.\n" +
        "2. Chute 1 aspecto por vez.\n" +
        "3. A qualquer momento do jogo você poderá arriscar o nome do Pokémon Misterioso, mas cuidado, você só tem 1 chance. Se errar, o jogo acaba...",
    ]);
    setIsRisking(false);
    setResetGame(true);
  };

  const handleSubmit = (e, selectInputs) => {
    e.preventDefault();
    let selectedAttribute = document
      .querySelectorAll("select")
      .values()
      .toArray()
      .filter((elem) => elem.value !== "" && !elem.disabled)[0];
    if (selectedAttribute) {
      console.log(playerPokes[playerPokeTarget]);
      const gameLogic = (selectedAttribute) => {
        let turn = gameTurn(
          playerPokes,
          playerPokes[playerPokeTarget],
          selectedAttribute
        );
        setPlayerPokes(turn.comparedPokes);

        if (selectInputs.filter((input) => input.asked).length === 11) {
          setAnnouncerMessages((prevState) => {
            return [
              "Que pena! Você ainda não encontrou o Pokémon Misterioso. Agora só resta arriscar!",
              turn.announcerMessage,
              ...prevState,
            ];
          });
        } else {
          setAnnouncerMessages((prevState) => [
            ...(Array.isArray(turn.announcerMessage)
              ? turn.announcerMessage
              : [turn.announcerMessage]),
            ...prevState,
          ]);
        }

        setGameOver(turn.gameOver);
      };

      gameLogic(selectedAttribute);

      return selectedAttribute.name;
    }
  };

  return (
    <>
      <div className="boardAbove">
        <ul className="playerPokes">
          {pokeIds.map((element, i) => (
            <Poke
              key={i}
              place={i}
              isRisking={isRisking}
              handlePokeRisked={handlePokeRisked}
              pokeId={element}
              addPoke={addPoke}
              visible={
                playerPokes.length === 39 ? playerPokes[i].visible : true
              }
              resetGame={resetGame}
            />
          ))}
        </ul>
      </div>
      <hr />
      <div className="boardBelow">
        <Form
          handleSubmit={handleSubmit}
          handleRisk={handleRisk}
          isRisking={isRisking}
          gameOver={gameOver}
          handleReset={handleReset}
          resetGame={resetGame}
        />
        <Announcer messages={announcerMessages} />
      </div>
    </>
  );
};

export default App;
