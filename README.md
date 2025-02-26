# meter-reading
Simulation of a utility meter reading app.

```bash
mkdir meter-reading
cd meter-reading
npm init -y
npm install webpack webpack-cli --save-dev
```

```bash
npm install --save lodash
```

```bash
npx webpack
```

```bash
npx webpack --config webpack.config.js
```

```plaintext
/meter-reading
│── /src
│   ├── /components       # Reusable UI components
│   ├── /services         # API services or business logic classes
│   ├── /utils            # General utility functions/helpers
│   ├── /styles           # CSS/SASS stylesheets
│   ├── index.js          # Main entry file
│── /dist                 # Webpack output folder
│── webpack.config.js     # Webpack configuration
│── package.json          # Project dependencies
```
