# 🎬 React Native Reels App (Reelify)

A mobile app built with React Native CLI that features a modern, creative login and registration flow with Firebase Authentication, and a smooth Instagram Reels-style video screen using mock data.

---

## 📱 Features
# Splash Screen
	
### 🔐 Authentication Flow
- Creative and visually appealing Login & Registration screens & Splash Screen.
- Firebase Authentication (Email & Password) integration.
- Smooth UX with real-time form validation and error handling.
- Seamless navigation from authentication to the Reels screen.
-Validations are there if you make a mistake it doesn’t allow you to sign in or sign up 

### 🎥 Reels Screen
- Mimics Instagram Reels behavior:
  - Vertical video feed.
  - Auto-play current reel, pause off-screen videos.
  - Smooth swipe transitions using `FlatList`
- Videos sourced from mock data (local assets or URLs).
- Reel Sharing option 
-Reel like and comment option



## 🛠️ Tech Stack

| Layer              | Technology |
|--------------------|------------|
| Framework          | React Native (CLI) |
| Authentication     | Firebase Authentication |
| State Management   | React Context |
| UI Enhancements    | Toast, React Native Animatable |
| Video Handling     | react-native-video |
---

## 📂 Folder Structure

```bash
.
├── /assets             # Static assets (images, videos, icons)
├── /screens            # App screens (Login, Register, Reels)
├── /components         # Reusable UI components
├── /Data         # Mock Data
├── App.js            # App entry point
└── README.md

#Sign-Up via registration form and start using the application locally 


Approach For this project :
🔍 1. Requirement Analysis
Goal: Understand every detail and visualize the end product.
•	Read and dissect project specs.
•	Sketch out the user flow: Login ➝ Reels Screen.
•	Decide on the tech:
o	Firebase for auth.
o	React Native CLI for the app base.
o	FlatList for Reels.
o	Mock data or public API for videos.
•	Plan the structure: screens, components, assets, services.
________________________________________
🛠️ 2. Environment Setup
Goal: Lay the groundwork so you're not scrambling later.
•	Set up a fresh React Native CLI project.
•	Initialize Git for version control.
•	Install must-have packages:
bash
CopyEdit
yarn add firebase react-native-video react-navigation
yarn add react-native-reanimated lottie-react-native
•	Configure Firebase project + enable Email/Password auth.
•	Set up directory structure (/screens, /components, etc.)
________________________________________
🧩 3. Authentication Flow (Login + Register)
Goal: Get users into the app with sleek UX.
•	Build beautiful login and signup UIs (use Lottie/Animatable for flair ✨).
•	Add form validation:
o	Email format.
o	Password min length.
•	Integrate Firebase Auth:
o	createUserWithEmailAndPassword
o	signInWithEmailAndPassword
•	Handle errors (like “user already exists” or “wrong password”).
•	On success: Navigate to Reels screen.
________________________________________
🎬 4. Reels Screen (Main Feature)
Goal: Deliver that juicy Instagram-like reels experience.
•	Design a fullscreen, scrollable video feed.
•	Use FlatList with pagingEnabled and onViewableItemsChanged.
•	For each item:
o	Autoplay video when in focus.
o	Pause when out of view.
o	Display username, caption, etc.
•	Pull mock data from local JSON or video URLs.
•	Lazy load videos, cache thumbnails.
________________________________________
🎨 5. Polishing the UI/UX
Goal: Make it feel like a top-tier app, not a school project.
•	Add animations and transitions.
•	Show loading indicators and toasts.
•	Make it responsive across screen sizes (test on small & large devices).
•	Apply pixel-perfect spacing, fonts, icons.
________________________________________
🧪 6. Testing and Debugging
Goal: Squash bugs before they squash your confidence.
•	Test:
o	Form validation
o	Auth flow (register/login/logout)
o	Reel playback and scroll performance
•	Debug memory or video lag issues (check Android + iOS).
•	Use React DevTools and Firebase Console for sanity checks.
________________________________________
🚀 7. Wrap-Up and Documentation
Goal: Prepare for deployment or sharing.
•	Clean up unused code/assets.
•	Write your README.md (done ✅).
•	Create a demo video or screen recording.
•	Push to GitHub with good commits.
•	Optionally deploy a release build to emulator or real device.

Libraries used for this Project 
"@react-native-firebase/app": "^22.2.0",
        "@react-native-firebase/auth": "^22.2.0",
        "@react-native-vector-icons/ionicons": "^12.0.0",
        "@react-navigation/native": "^7.1.9",
        "@react-navigation/stack": "^7.3.2",
        "react": "19.0.0",
        "react-native": "0.79.2",
        "react-native-gesture-handler": "^2.25.0",
        "react-native-linear-gradient": "^2.8.3",
        "react-native-reanimated": "^3.17.5",
        "react-native-safe-area-context": "^5.4.1",
        "react-native-screens": "^4.10.0",
        "react-native-sound": "^0.11.2",
        "react-native-vector-icons": "^10.2.0",
        "react-native-video": "^6.14.0"





This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
