import { useEffect, useState } from "react";
import styles from "./poke.module.css";

const Poke = ({
  place,
  isRisking,
  handlePokeRisked,
  pokeId,
  addPoke,
  visible,
  resetGame,
}) => {
  const [name, setPokemonName] = useState("");
  const [spriteUrl, setSpriteUrl] = useState("");
  const delay = Math.ceil(Math.random() * 5) * 0.1;
  const cardUpStyle = [
    styles.cardUp,
    styles.bgPlayer,
    isRisking ? styles.risking : "",
  ].join(" ");
  const cardDownStyle = styles.cardDown + " " + styles.bgCardDown;
  const pokeballIcon =
    "./pokeball.png";

  const handleRiskingClick = () => {
    if (isRisking) {
      handlePokeRisked(place);
    }
  };

  const getPoke = async () => {
    let tries = 10;
    while (tries > 0) {
      try {
        const response1 = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokeId}/`
        );
        const pokemon = await response1.json();
        const response2 = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokeId}`
        );
        const pokemonSpecies = await response2.json();
        const name = pokemonSpecies.names.find(
          (element) => element.language.name === "en"
        ).name;
        addPoke({ ...pokemon, speciesName: name }, place);
        setPokemonName(name);
        setSpriteUrl(pokemon.sprites.front_default);
        return true;
      } catch (error) {
        console.log(error);
        tries--;
      }
    }
  };

  useEffect(() => {
    getPoke();
  }, []);

  useEffect(() => {
    if (resetGame) {
      getPoke();
    }
  }, [resetGame]);

  /*
   */
  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        document.querySelector(
          ["#poke", pokeId, "place", place].join("_")
        ).style.display = "none";
        document.querySelector(
          `#${["poke", pokeId, "place", place].join("_")} + p`
        ).style.display = "none";
      }, delay * 1000 + 200);
    } else {
      setTimeout(() => {
        document.querySelector(
          ["#poke", pokeId, "place", place].join("_")
        ).style.display = "initial";
        document.querySelector(
          `#${["poke", pokeId, "place", place].join("_")} + p`
        ).style.display = "initial";
      }, delay * 1000 + 200);
    }
  }, [visible]);

  return (
    <li style={styles.li}>
      <div className={styles.flipContainer}>
        <div
          className={styles.flipper + " " + (!visible ? styles.wrongPoke : "")}
          style={{ "--delay": delay + "s" }}
        >
          <div className={cardUpStyle} onClick={handleRiskingClick}>
            <img
              src={spriteUrl}
              id={["poke", pokeId, "place", place].join("_")}
            />
            <p className={styles.name}>{name}</p>
          </div>
          <div className={cardDownStyle}>
            <img className={styles.cardBackIcon} src={pokeballIcon} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default Poke;
