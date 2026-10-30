# 🎬 NetflixGPT – AI-Driven Movie Discovery Engine

> A production-ready intelligent movie discovery platform combining a Netflix-inspired cinematic experience with **Google Gemini AI** and real movie data from the **OMDb API**.

<p align="center">
  <a href="https://netflixgpt-amber.vercel.app/">
    <strong>🚀 Live Demo → netflixgpt-amber.vercel.app</strong>
  </a>
</p>

---

## 🌟 Overview

**NetflixGPT** transforms conventional movie browsing into an intelligent, conversational discovery experience.

Instead of searching only by movie title, users can describe what they want to watch using natural language. They can search by **mood, genre, storyline, actors, themes, or movie combinations**, and Google Gemini AI interprets the request to generate relevant movie recommendations.

The recommended titles are then matched with real movie data from the **OMDb API**, providing posters, ratings, cast, genres, runtime, synopsis, and other movie information.

NetflixGPT supports natural-language discovery in:

- 🇬🇧 English
- 🇮🇳 Hindi
- 🇪🇸 Spanish

### 🚀 Live Application

**[NetflixGPT – Live Demo](https://netflixgpt-amber.vercel.app/)**

---

# ✨ Features

## 🎬 Netflix-Inspired Cinematic UI

- Netflix-inspired dark interface.
- Cinematic hero section for featured movies.
- Responsive movie cards and horizontal carousels.
- Hover animations and smooth transitions.
- Responsive layout for desktop and mobile devices.

---

## 🤖 Gemini AI Movie Discovery

NetflixGPT uses **Google Gemini AI** to understand natural-language movie requests.

Users don't need to know the exact movie title.

For example:

```text
Dark psychological thrillers like Shutter Island
```

```text
Movies about artificial intelligence and the future
```

```text
मुझे अच्छी साइंस फिक्शन फिल्में बताओ
```

Gemini interprets the intent and generates **5–10 relevant movie titles**.

These titles are then searched through OMDb to retrieve real movie information.

---

## 🔍 Dual Search Modes

NetflixGPT provides two different search experiences.

### 🤖 AI Discovery

Uses Gemini to understand natural-language queries and generate movie recommendations.

### 🔎 Direct Movie Search

Uses the OMDb API to search directly for movies by title or keyword.

This gives users both **semantic AI search** and **traditional movie search**.

---

## 🍿 Curated Movie Categories

The browse page contains multiple movie collections:

- 🔥 Popular Picks
- ⭐ Top Rated
- 🎬 Action & Thrills
- 😂 Comedy Gold
- ❤️ Romance & Drama
- 👻 Horror & Suspense
- 🚀 Sci-Fi & Mind Bending

Movies are dynamically retrieved from OMDb rather than relying entirely on static movie data.

---

## 🎥 Detailed Movie Information

Clicking a movie opens a detailed movie modal containing:

- 🎬 Movie poster
- ⭐ IMDb rating
- 📅 Release year
- 🎭 Genre
- ⏱️ Runtime
- 🎥 Director
- 👥 Cast
- 📝 Plot synopsis
- 🔗 Direct IMDb link

Users can explore important movie information without leaving the application.

---

## 🌐 Multilingual Support

NetflixGPT supports movie discovery across multiple languages:

- 🇬🇧 English
- 🇮🇳 Hindi
- 🇪🇸 Spanish

The application also includes centralized language configuration for UI text and prompts.

---

## 🔐 Firebase Authentication

Authentication is implemented using **Firebase Authentication**.

Features include:

- User registration
- Sign in
- Logout
- Persistent authentication session
- Authentication loading state
- Protected routes
- Automatic redirection for unauthenticated users
- Firebase error handling

---

## 🛡️ Reliable Poster Handling

Movie posters are not always available through OMDb.

NetflixGPT automatically falls back to a local placeholder:

```text
/assets/No_Image.webp
```

This prevents broken image elements from appearing in the interface.

---

## ⚡ Optimized API Usage

The application uses a centralized OMDb service with **in-memory request caching** to reduce unnecessary API calls.

This improves:

- API efficiency
- Response time
- Browsing experience
- Repeated movie searches

---

## 🧠 Structured Gemini Responses

Gemini responses are processed using a structured JSON format.

The application includes:

- Strict JSON response validation
- Markdown fence sanitization
- Consistent recommendation parsing
- Error handling for invalid AI responses

This allows AI-generated recommendations to integrate reliably with the movie API.

---

# 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 19 |
| Routing | React Router v7 |
| State Management | Redux Toolkit |
| UI | Tailwind CSS v4 |
| Build Tool | Vite 7 |
| AI | Google Gemini API |
| AI SDK | `@google/genai` |
| Movie Data | OMDb API |
| Authentication | Firebase Authentication |
| Deployment | Vercel |

---

# 🏗️ Architecture

```text
                    ┌───────────────────┐
                    │       User        │
                    └─────────┬─────────┘
                              │
                              ▼
                  ┌───────────────────────┐
                  │   React Frontend      │
                  │ React Router + UI     │
                  └───────────┬───────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
       ┌─────────────────┐         ┌─────────────────┐
       │   Gemini AI     │         │    OMDb API     │
       │   @google/genai │         │ Movie Metadata  │
       └────────┬────────┘         └────────┬────────┘
                │                           │
                │ Movie Recommendations     │
                └─────────────┬─────────────┘
                              ▼
                    ┌───────────────────┐
                    │  Redux Toolkit    │
                    │   Global State    │
                    └─────────┬─────────┘
                              │
                              ▼
                  ┌───────────────────────┐
                  │ Movie Cards / Modal   │
                  │   Cinematic UI        │
                  └───────────────────────┘

                    Authentication
                          │
                          ▼
                 ┌─────────────────┐
                 │ Firebase Auth   │
                 └─────────────────┘
```

---

# 🔄 AI Recommendation Flow

```text
User's Natural-Language Query
            │
            ▼
       GptSearchBar
            │
            ▼
        Gemini API
            │
            ▼
    Structured JSON Response
            │
            ▼
       Movie Titles
            │
            ▼
         OMDb API
            │
            ▼
 Real Movie Metadata + Posters
            │
            ▼
    Redux Toolkit Store
            │
            ▼
      Movie Cards / Grid
```

### Example

```text
"Recommend mind-bending sci-fi movies like Interstellar"
                         │
                         ▼
                    Gemini AI
                         │
                         ▼
       Interstellar, Inception, Arrival...
                         │
                         ▼
                     OMDb API
                         │
                         ▼
       Posters + Ratings + Cast + Plot
                         │
                         ▼
                  NetflixGPT UI
```

---

# 📁 Project Structure

```text
NetflixGPT/
│
├── public/
│   ├── assets/
│   │   └── No_Image.webp
│   │       # Fallback poster image
│   │
│   └── vite.svg
│
├── src/
│   │
│   ├── assets/
│   │   # Application assets
│   │
│   ├── Components/
│   │   ├── Body.jsx
│   │   │   # Application routing configuration
│   │   │
│   │   ├── Browse.jsx
│   │   │   # Main movie browsing page
│   │   │
│   │   ├── GptMovieSuggestions.jsx
│   │   │   # AI and direct search results
│   │   │
│   │   ├── GptSearch.jsx
│   │   │   # AI search page container
│   │   │
│   │   ├── GptSearchBar.jsx
│   │   │   # AI and direct search interface
│   │   │
│   │   ├── Header.jsx
│   │   │   # Global navigation and user actions
│   │   │
│   │   ├── HeroMovie.jsx
│   │   │   # Featured movie hero section
│   │   │
│   │   ├── Login.jsx
│   │   │   # Sign in and sign up interface
│   │   │
│   │   ├── MainContainer.jsx
│   │   │   # Main hero section wrapper
│   │   │
│   │   ├── MovieCard.jsx
│   │   │   # Reusable movie card component
│   │   │
│   │   ├── MovieDetails.jsx
│   │   │   # Detailed movie information modal
│   │   │
│   │   ├── MovieGrid.jsx
│   │   │   # Responsive movie grid
│   │   │
│   │   ├── MovieList.jsx
│   │   │   # Horizontal movie carousel
│   │   │
│   │   ├── MovieRow.jsx
│   │   │   # Movie category row wrapper
│   │   │
│   │   ├── ProtectedRoute.jsx
│   │   │   # Authentication route guard
│   │   │
│   │   ├── SecondaryContainer.jsx
│   │   │   # Curated movie categories
│   │   │
│   │   └── ShimmerBrowse.jsx
│   │       # Skeleton loading state
│   │
│   ├── hooks/
│   │   ├── useCuratedMovies.js
│   │   │   # Fetches curated movie collections
│   │   │
│   │   ├── useMovieDetails.js
│   │   │   # Fetches complete movie details
│   │   │
│   │   └── useMovieSearch.js
│   │       # Handles direct movie search
│   │
│   ├── utils/
│   │   ├── appStore.js
│   │   │   # Redux store configuration
│   │   │
│   │   ├── configSlice.js
│   │   │   # Language/application configuration state
│   │   │
│   │   ├── constant.js
│   │   │   # Application constants
│   │   │
│   │   ├── firebase.js
│   │   │   # Firebase initialization
│   │   │
│   │   ├── gemini.js
│   │   │   # Gemini API integration
│   │   │
│   │   ├── gptSlice.js
│   │   │   # AI recommendation state
│   │   │
│   │   ├── languageConstants.js
│   │   │   # Multilingual translations
│   │   │
│   │   ├── movieApi.js
│   │   │   # Centralized OMDb API service
│   │   │
│   │   ├── movieSlice.js
│   │   │   # Movie and modal state
│   │   │
│   │   ├── userSlice.js
│   │   │   # Authentication user state
│   │   │
│   │   └── validate.js
│   │       # Form validation and Firebase errors
│   │
│   ├── App.jsx
│   │   # Root application component
│   │
│   ├── index.css
│   │   # Global styles
│   │
│   ├── main.jsx
│   │   # React entry point
│   │
│   └── vite.config.js
│       # Vite configuration
│
├── .env.example
│   # Environment variable template
│
├── package.json
│   # Dependencies and scripts
│
└── README.md
    # Project documentation
```

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

```env
# OMDb API
REACT_APP_OMDB_API_KEY=your_omdb_api_key

# Google Gemini API
REACT_APP_GEMINI_API_KEY=your_gemini_api_key

# Firebase
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

> **Note:** The Vite configuration supports both `REACT_APP_` and `VITE_` environment variable prefixes.

### API Keys

- **OMDb API:** Get an API key from the OMDb website.
- **Gemini API:** Create a Gemini API key through Google AI Studio.
- **Firebase:** Create a Firebase project and enable Email/Password Authentication.

---

# 🚀 Getting Started

## 1. Prerequisites

Make sure you have installed:

- Node.js v18+
- npm v9+

Check your versions:

```bash
node -v
npm -v
```

---

## 2. Clone the Repository

```bash
git clone https://github.com/your-username/netflixgpt.git

cd netflixgpt
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Then add your OMDb, Gemini, and Firebase credentials.

> Never commit your `.env` file or expose private API credentials in your repository.

---

## 5. Run the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:5173/
```

---

# 🏭 Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

# 🌐 Deployment

## 🚀 Live Demo

**Production Application:**

https://netflixgpt-amber.vercel.app/

## Deploy with Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add all required environment variables.
4. Set the build command:

```bash
npm run build
```

5. Set the output directory:

```text
dist
```

6. Deploy.

After deployment, the application will be available through your Vercel domain.

---

# 🔒 Security Notes

- API keys should be stored in environment variables.
- `.env` should not be committed to Git.
- Firebase authentication handles user authentication.
- Never expose sensitive credentials in source code.
- Configure API restrictions where supported.

---

# 🎯 Key Technical Highlights

NetflixGPT demonstrates practical implementation of:

- **React 19**
- **Redux Toolkit**
- **React Router**
- **Tailwind CSS**
- **Google Gemini API**
- **Official `@google/genai` SDK**
- **Natural-language AI search**
- **Structured AI responses**
- **REST API integration**
- **OMDb movie data**
- **Firebase Authentication**
- **Protected routes**
- **Custom React hooks**
- **API request caching**
- **Multilingual UI**
- **Responsive design**
- **Vite production builds**
- **Vercel deployment**

---

# 📌 Future Improvements

Potential improvements for future versions:

- 🎯 Personalized recommendations based on watch history
- ❤️ Watchlist and favorites
- ⭐ User movie ratings
- 🕐 Recently viewed movies
- 🧠 Improved recommendation personalization
- 🎙️ Voice-based movie search
- 💬 Conversational movie assistant
- 📱 Progressive Web App support
- 🎞️ Movie trailers and streaming availability
- 🔔 Personalized movie notifications

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Ayush Kumar**

Built with ❤️ using **React, Redux Toolkit, Google Gemini AI, Firebase, and OMDb API**.

### 🔗 Live Project

**[🚀 Open NetflixGPT](https://netflixgpt-amber.vercel.app/)**
