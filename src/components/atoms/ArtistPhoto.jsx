const ArtistPhoto = ({ data }) => {
  return (
    <img
      src={data.src}
      alt={data.fileName}
      className="photo"
      crossOrigin="anonymous"
    />
  );
};

export default ArtistPhoto;
