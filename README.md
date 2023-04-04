# Full-Stack Social Media Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern and responsive social media application inspired from Instagram built with ReactJS, TailwindCSS, Redux Toolkit, RTK-Query, and Socket.io.

## Preview

Check out the live demo [here](https://mistragram.netlify.app/).

## Features

-   User profile creation and customization.
-   User authentication and login
-   News feed displaying user's friends or followed accounts posts
-   Posting content, including text, images, and videos
-   Commenting and liking posts
-   Direct messaging or private messaging between users
-   Notifications for likes, comments, and new followers
-   User search functionality by name or username

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js and npm installed on your machine

### Installation

1. Clone the repo

```sh
git clone git@github.com:abdullahmia/mern-social-media.git
```

2. Install NPM packages

```sh
npm install
```

3. Create a `.env` file in the root directory and add api url

```sh
REACT_APP_API_URL= [your api url]
REACT_APP_CLOUDINARY_IMAGE_URL= [your cloudinary image url]
REACT_APP_SERVER_URL= [your api url]
```

<!-- start the server -->

4. Start the server

```sh
npm run server
```

5. Open your browser and navigate to `http://localhost:3000`.

## Built With

-   [ReactJS](https://reactjs.org/)
-   [TailwindCSS](https://tailwindcss.com/)
-   [Redux Toolkit](https://redux-toolkit.js.org/)
-   [RTK-Query](https://rtk-query.js.org/)
-   [Socket.io](https://socket.io/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
