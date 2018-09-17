# Description

This is a very lean jumpstart template incorporating ES 6 JS (Babel), Webpack, and PostCss. 

The PostCss setup shown here follows the [SMACSS](https://smacss.com/book/) methodology for the most part, while taking 
advantage of the features of CSS Next and related modules.

[Click here for more info on how the CSS template is structured.](https://github.com/IsaacBell/Webpack-Postcss-Framework/blob/master/src/styles/app.css) 

# Getting Started

Install dependencies with NPM:

```
npm install 
```  

Install Webpack globally:

```
npm install -g webpack
```

Bundle assets with:

```
webpack --config webpack.config.js
```

# Development
To launch a dev environment at localhost:8080. 

```
webpack-dev-server
```

Content is served from the public/ directory.
