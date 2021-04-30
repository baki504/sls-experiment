## create project

```sh
# create template
serverless create --template aws-nodejs-typescript --name sls-nodejs-typescript-experiment

# offline install (https://github.com/dherault/serverless-offline)
npm install serverless-offline --save-dev

# serverless.ts
## region設定
## offline plugins設定追加
```

## .gitignore

```
# package directories
node_modules
jspm_packages

# Serverless directories
.serverless

# Webpack directories
.webpack
```

## commands

```sh
npm i
npx sls deploy
sls offline
```
