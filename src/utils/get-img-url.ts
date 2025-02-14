export const getImgUrl = (url: string) => {
    return process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL + "/original" + url;
  };