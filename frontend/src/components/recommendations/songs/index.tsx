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
  songsLayout,
} from "./style";
import Image from "next/image";
import { getBase64EncodedData, isEmptyData } from "@/src/utils/commonUtils";
import { useState } from "react";
import SongDetails from "./more-details";
import CustomDialog from "../../dialog";
import SongSkeleton from "../../skeletons/songRecommendation";

const SongTile = ({ recommendation, targetRef }) => {
  const [showSongDetails, setShowSongDetails] = useState(false);
  const songImage = recommendation?.images[0];
  const imagePlaceholder = getBase64EncodedData(150, 150);
  if (isEmptyData(songImage)) {
    return;
  }

  const songTileClickHandler = () => {
    setShowSongDetails((prev) => !prev);
  };
  return (
    <>
      <div ref={targetRef} className={songTileContainer}>
        <Image
          onClick={songTileClickHandler}
          src={songImage?.url}
          width={150}
          height={150}
          alt="playlist image"
          className={songTile}
          placeholder="blur"
          blurDataURL={imagePlaceholder}
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
  const {
    songs,
    songContainerRef,
    targetRef,
    hasPreviousPage,
    isFetchingSongData,
  } = useSongRecommender({});
  return (
    <div className={songContainer}>
      <p className={songContainerTitle}>Songs</p>
      <div className={songsLayout}>
        {!hasPreviousPage && isFetchingSongData ? (
          <SongSkeleton />
        ) : (
          <div ref={songContainerRef} className={songSuggestionContainer}>
            {!isEmptyData(songs?.pages) &&
              songs?.pages?.map((page, pageIndex) => {
                return (
                  !isEmptyData(page?.data?.albums?.items) &&
                  page.data.albums?.items.map((recommendation, albumIndex) => {
                    const isLast =
                      pageIndex === songs.pages.length - 1 &&
                      albumIndex === page.data.albums.items.length - 1;
                    return (
                      <>
                        <SongTile
                          targetRef={isLast ? targetRef : null}
                          key={`${recommendation.name}-${albumIndex}`}
                          recommendation={recommendation}
                        />
                      </>
                    );
                  })
                );
              })}
          </div>
        )}
        {hasPreviousPage && isFetchingSongData && <SongSkeleton />}
      </div>
    </div>
  );
};

export default SongRecommendation;
