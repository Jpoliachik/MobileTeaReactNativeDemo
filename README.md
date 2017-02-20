# MobileTeaReactNativeDemo
Simple ToDo App React Native Sample

1. Follow [React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started.html)
  - Stop before running `react-native init AwesomeProject`
2. Clone Repo
3. `yarn` or `npm install`
4. Setup Firebase project, select 'new web app', then paste your tokens in place of these inside `MainView.js`: 
```
const FIREBASE_CONFIG = {
  apiKey: "xxxxxxxx",
  authDomain: "xxxxxxxx",
  databaseURL: "xxxxxxxx",
  storageBucket: "xxxxxxxx",
  messagingSenderId: "xxxxxxxx"
};
```

Good to go. `react-native run-ios` / `react-native run-android` with simulators / devices open. 
