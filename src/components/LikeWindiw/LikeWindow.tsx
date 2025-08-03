import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { clearPokemons } from '../../redux/likePokemonSlice';
import Button from '../../utils/Button/Button';
import { downloadLikesPokemonsV } from '../../utils/dowloadLikesPokemons';
import './LikeWindow.css';

const LikeWindow = () => {
  const dispatch = useAppDispatch();
  const windowVisible = useAppSelector((state) => state.like.window);
  const liked = useAppSelector((state) => state.like.pokemons);

  if (!windowVisible) return null;
  return (
    <div className="like-window">
      <p>Save: {liked.length}</p>
      <Button
        onClick={() => {
          downloadLikesPokemonsV(liked);
        }}
      >
        Download
      </Button>
      <Button onClick={() => dispatch(clearPokemons())}>Unselect all</Button>
    </div>
  );
};

export default LikeWindow;
