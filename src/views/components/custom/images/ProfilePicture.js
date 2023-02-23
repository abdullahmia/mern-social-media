const ProfilePicture = ({src, ...rest}) => {
  return (
      <img
        src={`${process.env.REACT_APP_CLOUDINARY_IMAGE_LINK}/${src ? src : 'social-media/user_wxjx6f'}`}
          {...rest}
          alt="ProfilePicture"
      />
  )
}

export default ProfilePicture;