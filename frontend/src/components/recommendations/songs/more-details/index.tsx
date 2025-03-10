import Image from "next/image";
import {
  songDetailsContainer,
  songImage,
  songInformation,
  songInformationKeys,
  songImageContainer,
  artistNameLink,
  songDetailsActionContainer,
  iconBase,
} from "./style";
import { IconButton } from "@mui/material";
import Link from "next/link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShareIcon from "@mui/icons-material/Share";
import { useToastMessage } from "@/src/hooks/useToastMessage";

const SongDetails = ({ recommendation }) => {
  const image = recommendation?.images[0];
  const artistsCount = recommendation.artists.length;
  const { triggerSuccessToast, triggerErrorToast } = useToastMessage();

  const getArtistNames = () => {
    return recommendation.artists
      .map(({ name }) => name)
      .join(",")
      .trim();
  };
  const sharePlaylist = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this track on Spotify!",
          text: `I'm loving this song! Give it a listen: ${
            recommendation.name
          } by ${getArtistNames()}`,
          url: recommendation.external_urls.spotify,
        });
        triggerSuccessToast("Successfully copied to clipboard");
      } catch {
        triggerErrorToast("Could not copy to clipboard");
      }
    } else {
      triggerErrorToast("Cannot copy to clipboard");
    }
  };

  return (
    <div className={songDetailsContainer}>
      <div className={songImageContainer}>
        <Image
          src={image?.url}
          width={150}
          height={150}
          alt="playlist image"
          className={songImage}
        />
        <div className={songDetailsActionContainer}>
          <Link target="_blank" href={recommendation.external_urls.spotify}>
            <IconButton className={iconBase}>
              <PlayArrowIcon />
            </IconButton>
          </Link>
          <IconButton onClick={sharePlaylist} className={iconBase}>
            <ShareIcon />
          </IconButton>
        </div>
      </div>
      <div className={songInformation}>
        <div>
          <span className={songInformationKeys}>Release Date</span>:{" "}
          {recommendation.release_date}
        </div>
        <div>
          <span className={songInformationKeys}>Total Tracks</span>:{" "}
          {recommendation.total_tracks}
        </div>
        <div>
          <span className={songInformationKeys}>
            Artist{artistsCount > 1 ? "s" : ""}
          </span>
          :{" "}
          {recommendation.artists.map(({ name, external_urls }, idx) => {
            const isLast = idx === recommendation.artists.length - 1;
            return (
              <>
                <Link
                  target="_blank"
                  className={artistNameLink}
                  key={name}
                  href={external_urls.spotify}
                >
                  {name}
                </Link>
                {!isLast && ","}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
