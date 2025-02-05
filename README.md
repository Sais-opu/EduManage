# EduManage

![EduManage Banner](https://i.ibb.co.com/hJFq19JK/edu.png)

EduManage is a comprehensive MERN stack-based web application designed to streamline class management, skill learning, and interaction among educational institutions, tutors, and students. The platform aims to make education more efficient and accessible.
## Project Purpose  

EduManage aims to revolutionize the way educational institutions, tutors, and students manage classes, assignments, and personal progress. By integrating modern technologies and a user-friendly interface, EduManage empowers users to easily access, track, and manage educational activities, all while enhancing collaboration and communication within the educational community.

## Project Overview  

EduManage is a comprehensive MERN stack-based web application that simplifies class management, skill learning, and interaction among educational institutions, tutors, and students. It provides a seamless platform for teachers to manage classes, for students to track their learning journey, and for admins to oversee the entire system. With features like secure authentication, real-time data fetching, and a responsive design, EduManage makes education more accessible and efficient for all users.
## 🌍 Live Demo  

🔗 **[Visit CrowdCube Live](https://edumanage-f0f88.web.app/)**  


## Features

- **Navbar:** Dynamic navbar with login/logout options, profile picture, and dropdown functionality.
- **Homepage:** Engaging homepage with a banner, collaborators' section, popular classes slider, feedback carousel, and key metrics display.
- **Class Management:** Teachers can add, update, and delete classes, while admins manage approvals and progress tracking.
- **Student Dashboard:** Track enrolled classes, assignments, and teaching evaluation reports.
- **Admin Dashboard:** Manage teacher requests, users, and classes with advanced search and filtering features.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.
- **Notifications:** Sweet alerts and toasts for CRUD operations and authentication events.
- **Secure Authentication:** Email/password login, Google sign-in, and JWT-based private routes.
- **Pagination:** Efficient pagination for tables and lists.
- **TanStack Query:** Integrated for seamless data fetching.
- **Dynamic Search:** Real-time search for users and classes.

## 🛠️ Technologies Used  

- **Frontend**: React, React Router, Material UI, TailwindCSS, DaisyUI  
- **Backend**: Firebase, MongoBD 
- **Deployment**: Vercel, Netlify, Firebase Hosting  
- **State Management & UI**: React Hooks, Emotion, Lottie, Vite 
- **Notifications & Alerts**: React Toastify, SweetAlert2

## Additional Resources

Here are some useful resources to help you understand the technologies used in this project:

- [React.js Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)


## Project Setup

To run the project locally, follow these steps:

```sh
# Clone the repository
git clone https://github.com/Sais-opu/EduManage-client.git

# Navigate to the project folder
cd edumanage

# Install dependencies
npm install

# Start the development server
npm run dev
```
```sh
#Or you can try to install
npm i react-router-dom
npm i react-toastify
npm install
```

## Package Dependencies

```json
{
  "name": "edumanage",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "axios": "^1.7.9",
    "firebase": "^11.2.0",
    "motion": "^12.0.6",
    "react": "^18.3.1",
    "react-axios": "^2.0.6",
    "react-bootstrap": "^2.10.8",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.3",
    "react-simple-star-rating": "^5.1.7",
    "react-slick": "^0.30.3",
    "react-slider": "^2.0.6",
    "react-toastify": "^11.0.3",
    "swiper": "^11.2.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "daisyui": "^5.0.0-beta.2",
    "eslint": "^9.17.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.14.0",
    "postcss": "^8.5.1",
    "tailwindcss": "^4.0.0",
    "vite": "^6.0.5"
  }
}
```


