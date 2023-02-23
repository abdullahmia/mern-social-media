const ProfilePicture = ({src, ...rest}) => {
  return (
      <img
          src={`${process.env.REACT_APP_CLOUDINARY_IMAGE_LINK}/${src}`}
          {...rest}
          alt="ProfilePicture"
      />
  )
}

export default ProfilePicture;