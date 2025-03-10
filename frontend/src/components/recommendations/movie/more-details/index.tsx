import {
  movieDetailsContainer,
  movieInformation,
  movieInformationKeys,
  movieImage,
} from "./style";
import Image from "next/image";

const MovieDetails = ({ recommendation }) => {
  const { title, imageurl, synopsis, imdbrating, genre, released } =
    recommendation;

  const genres = genre.join(", ").trim();
  return (
    <div className={movieDetailsContainer}>
      <Image
        src={imageurl[0]}
        className={movieImage}
        width={120}
        height={200}
        alt={title}
      />
      <div className={movieInformation}>
        <div>
          <span className={movieInformationKeys}>Released Date</span>:{" "}
          {released}
        </div>
        <div>
          <span className={movieInformationKeys}>IMDB Rating</span>:{" "}
          {imdbrating}
        </div>
        <div>
          <span className={movieInformationKeys}>Genres</span>: {genres}
        </div>
        <div>{synopsis}</div>
      </div>
    </div>
  );
};

export default MovieDetails;
