import { useSongRecommender } from "@/src/hooks/modules/recommendations/useSongRecommender";
import {
  songContainer,
  songContainerTitle,
  songSuggestionContainer,
  songTileContainer,
  songTileContentContainer,
  typeContainer,
  songNameContainer,
  songTile,
} from "./style";
import Image from "next/image";
import { isEmptyData } from "@/src/utils/commonUtils";
import { useState } from "react";
import SongDetails from "./more-details";
import CustomDialog from "../../dialog";

const SongTile = ({ recommendation }: any) => {
  const [showSongDetails, setShowSongDetails] = useState(false);
  const songImage = recommendation?.images[0];
  if (isEmptyData(songImage)) {
    return;
  }

  const songTileClickHandler = () => {
    setShowSongDetails((prev) => !prev);
  };

  return (
    <>
      <div className={songTileContainer}>
        <Image
          onClick={songTileClickHandler}
          src={songImage?.url}
          width={150}
          height={150}
          alt="playlist image"
          className={songTile}
        />
        <div className={songTileContentContainer}>
          <p className={typeContainer}>{recommendation?.type}</p>
          <p className={songNameContainer}>{recommendation?.name}</p>
        </div>
      </div>
      <CustomDialog
        open={showSongDetails}
        onCloseHandler={songTileClickHandler}
        title={recommendation?.name}
      >
        <SongDetails recommendation={recommendation} />
      </CustomDialog>
    </>
  );
};

const SongRecommendation = () => {
  const { albums } = useSongRecommender({});
  return (
    <div className={songContainer}>
      <p className={songContainerTitle}>Songs</p>
      <div className={songSuggestionContainer}>
        {albums?.items &&
          albums?.items.map((recommendation) => {
            return <SongTile recommendation={recommendation} />;
          })}
      </div>
    </div>
  );
};

export default SongRecommendation;
