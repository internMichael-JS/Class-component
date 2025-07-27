import type { Pokemon } from '../../utils/interfaces';
import './PokemonDetails.css';

interface Props {
  pokemon: Pokemon;
  onClose: () => void;
}

export const PokemonDetails = ({ pokemon, onClose }: Props) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <img src={pokemon.img} alt={pokemon.name} className="pokemon-img" />
        <h4 className="pokemon-name">
          <strong>{pokemon.name.toLocaleUpperCase()}</strong>
        </h4>
        <p className="pokemon-types">
          <b>Type:</b> {pokemon.types}
        </p>
        <p className="pokemon-types">
          <b>Experience:</b> {pokemon.experience}
        </p>
        <p className="pokemon-types">
          <b>Weight:</b> {pokemon.weight}
        </p>
        <p className="pokemon-types">
          <b>Height:</b> {pokemon.height}
        </p>
      </div>
    </div>
  );
};
