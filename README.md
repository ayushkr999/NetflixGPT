# NetflixGPT – AI-Driven Movie Discovery Engine

> A production-grade intelligent movie recommendation platform combining a Netflix-inspired cinematic experience with Google Gemini AI and real movie data from OMDb.

---

## 🌟 Overview

**NetflixGPT** transforms conventional movie browsing by combining natural-language generative AI recommendations with real-time movie catalog data. Users can describe the vibe, plot, emotional tone, or specific actor combinations in **English, Hindi, or Spanish**, and Google Gemini AI interprets the user's intent to recommend 5–10 real movie titles. Real movie metadata (official posters, ratings, cast, synopsis, genres) is then fetched directly via the **OMDb API**.

---

## ✨ Features

- 🎬 **Netflix-Inspired Cinematic UI**: Dark theme, hero spotlight section, responsive carousels, smooth transitions, and hover animations.
- 🤖 **Gemini AI Natural-Language Discovery**: Describe any concept, mood, or combination (e.g. *"Dark psychological thrillers like Shutter Island"* or *"मुझे अच्छी साइंस फिक्शन फिल्में बताओ"*).
- 🍿 **Curated Browse Sections**: Hand-picked collections fetched from OMDb:
  - 🔥 Popular Picks
  - ⭐ Top Rated
  - 🎬 Action & Thrills
  - 😂 Comedy Gold
  - ❤️ Romance & Drama
  - 👻 Horror & Suspense
  - 🚀 Sci-Fi & Mind Bending
- 🔍 **Dual Search Modes**:
  - **AI Discovery**: Natural-language semantic movie recommendations powered by Google Gemini.
  - **Direct Movie Search**: Real-time keyword & title search via OMDb.
- 📑 **Comprehensive Movie Details Modal**: Poster, IMDb rating, year, genre tags, director, cast, runtime, plot synopsis, and direct link to IMDb.
- 🌐 **Multilingual Support**: Supports queries and interface prompts in **English**, **Hindi (हिन्दी)**, and **Spanish (Español)**.
- 🔐 **Firebase Authentication**:
  - User Sign Up, Sign In, and Logout.
  - Persistent auth session with loading spinner.
  - Protected browse routes with automatic redirection for unauthenticated users.
- 🛡️ **Zero Broken Posters**: Automatic fallback to `/assets/No_Image.webp` when poster art is unavailable.
- ⚡ **Zero TMDB / Zero OpenAI Dependency**: 100% migrated to Google Gemini via the official `@google/genai` SDK and OMDb API.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router v7
- **State Management**: Redux Toolkit & React-Redux
- **Styling**: Tailwind CSS v4
- **AI Engine**: Google Gemini API (`@google/genai` official SDK)
- **Movie Catalog**: OMDb API
- **Authentication**: Firebase Authentication
- **Build Tool**: Vite 7
- **Deployment Ready**: Vercel, Firebase Hosting, Netlify

---

## 🏗️ Architecture

```
User Query (English / Hindi / Spanish)
              │
              ▼
   NetflixGPT Search Bar
              │
              ▼
      Google Gemini API
 (gemini-2.5-flash via @google/genai)
  - Strict JSON schema validation
  - Markdown fence sanitization
              │
              ▼
  5–10 Real Movie Titles
              │
              ▼
          OMDb API
  - Direct metadata & poster retrieval
  - In-memory request caching
              │
              ▼
     Redux Toolkit Store
              │
              ▼
   Cinematic Movie Cards & Modal
```

---

## 📁 Project Structure

```text
NetflixGPT/
├── public/
│   ├── assets/
│   │   └── No_Image.webp        # Fallback poster image
│   └── vite.svg
│
├── src/
│   ├── assets/
│   ├── Components/
│   │   ├── Body.jsx              # Router configuration
│   │   ├── Browse.jsx            # Main browse page
│   │   ├── GptMovieSuggestions.jsx# AI & direct search results
│   │   ├── GptSearch.jsx         # Search view container
│   │   ├── GptSearchBar.jsx      # Dual-mode AI & keyword search bar
│   │   ├── Header.jsx            # Global Netflix header with profile & actions
│   │   ├── HeroMovie.jsx         # Spotlight featured movie hero
│   │   ├── Login.jsx             # Auth form (Sign in / Sign up)
│   │   ├── MainContainer.jsx     # Hero section wrapper
│   │   ├── MovieCard.jsx         # Reusable movie card with poster & badges
│   │   ├── MovieDetails.jsx      # Detailed movie modal
│   │   ├── MovieGrid.jsx         # Responsive grid display
│   │   ├── MovieList.jsx         # Horizontal carousel row
│   │   ├── MovieRow.jsx          # Row wrapper
│   │   ├── ProtectedRoute.jsx    # Auth route guard
│   │   ├── SecondaryContainer.jsx# Curated movie categories
│   │   └── ShimmerBrowse.jsx     # Skeleton loading state
│   │
│   ├── hooks/
│   │   ├── useCuratedMovies.js   # Fetches category collections
│   │   ├── useMovieDetails.js    # Fetches single movie full details
│   │   └── useMovieSearch.js     # Search hook
│   │
│   ├── utils/
│   │   ├── appStore.js           # Redux configureStore
│   │   ├── configSlice.js        # Language configuration slice
│   │   ├── constant.js           # App constants & curated title collections
│   │   ├── firebase.js           # Firebase app & auth initialization
│   │   ├── gemini.js             # Official Google GenAI SDK service
│   │   ├── gptSlice.js           # AI recommendations slice
│   │   ├── languageConstants.js  # Multilingual translations
│   │   ├── movieApi.js           # Centralized OMDb API service
│   │   ├── movieSlice.js         # Movies and modal state slice
│   │   ├── userSlice.js          # Authentication user state slice
│   │   └── validate.js           # Form validation & Firebase error mapping
│   │
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── vite.config.js
│
├── .env.example
├── package.json
└── README.md
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
# OMDb API Key (Get free key at: https://www.omdbapi.com/apikey.aspx)
REACT_APP_OMDB_API_KEY=your_omdb_api_key

# Google Gemini API Key (Get free key at: https://aistudio.google.com/apikey)
REACT_APP_GEMINI_API_KEY=your_gemini_api_key

# Firebase Authentication (From Firebase Console -> Project Settings)
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

> **Note**: Both `REACT_APP_` and `VITE_` prefixes are supported by the Vite configuration.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/netflixgpt.git
cd netflixgpt

# Install dependencies
npm install
```

### 3. Configure API Keys
Copy `.env.example` to `.env` and fill in your keys:
```bash
cp .env.example .env
```

- **OMDb API**: Request a free key at [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx).
- **Gemini API**: Request a free key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
- **Firebase**: Create a project in [Firebase Console](https://console.firebase.google.com/), enable Email/Password authentication, and paste the config.

### 4. Running Locally
```bash
npm start
# or
npm run dev
```
Open your browser at `http://localhost:5173/`.

### 5. Production Build
```bash
npm run build
npm run preview
```

---

## 🌐 Deployment

### Deploy to Vercel
1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add the environment variables from your `.env` file into the Vercel project settings.
4. Set build command to `npm run build` and output directory to `dist`.
5. Deploy!

---

## 📄 License

This project is licensed under the MIT License.
