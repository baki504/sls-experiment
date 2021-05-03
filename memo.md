## create project

```sh
# create template
serverless create --template aws-nodejs-typescript --name sls-nodejs-typescript-experiment

# additional library
npm install serverless-offline --save-dev
npm i serverless-mysql
npm i -D serverless-dotenv-plugin
npm install serverless-s3-local --save-dev
sls plugin install --name serverless-s3-local # ???
aws --endpoint="http://localhost:8000" s3 cp data.txt s3://local-bucket/data.txt --profile s3local
aws s3 cp data.txt s3://myBucket/data.txt
npm install serverless-plugin-existing-s3
npm i -D aws-sdk

# jest plugin
# this support cli function creation
# notice: not support typescript
npm install --save-dev serverless-jest-plugin


# serverless.ts
## region
## offline plugins
## s3-local plugins !! うまく動かない
## serverless-plugin-existing-s3

```

## lambda : s3 = 1 : 1

```
An error occurred: S3BucketSlsinputbucket - Configurations overlap. Configurations on the same bucket cannot share a common event type. (Service: Amazon S3; Status Code: 400; Error Code: InvalidArgument; Request ID: FHW0WJ5Z28NJZBYG; S3 Extended Request ID: HODouw420l5FCLcOEFYL1EVpJXV3VYeD4vFwZ4zHE1mVwFvAKPHaCJpr2ZQHqGQs6KR1GSBAO8U=; Proxy: null).
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

## table

```sql
CREATE TABLE slsdb.CUSTOMERS(
   ID   INT              NOT NULL,
   NAME VARCHAR (20)     NOT NULL,
   AGE  INT              NOT NULL,
   ADDRESS  CHAR (25) ,
   SALARY   DECIMAL (18, 2),
   PRIMARY KEY (ID)
);
```

## error while serverless-mysql install

```sh
PS C:\dev\gitrepo\sls-experiment> npm i serverless-mysql

> snappy@6.3.5 install C:\dev\gitrepo\sls-experiment\node_modules\snappy
> prebuild-install || node-gyp rebuild

prebuild-install WARN install No prebuilt binaries found (target=14.15.3 runtime=node arch=x64 libc= platform=win32)

C:\dev\gitrepo\sls-experiment\node_modules\snappy>if not defined npm_config_node_gyp (node "C:\Program Files\nodejs\node_modules\npm\node_modules\npm-lifecycle\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild )  else (node "C:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\bin\node-gyp.js" rebuild )
gyp ERR! find Python
gyp ERR! find Python Python is not set from command line or npm configuration
gyp ERR! find Python Python is not set from environment variable PYTHON
gyp ERR! find Python checking if "python" can be used
gyp ERR! find Python - "python" is not in PATH or produced an error
gyp ERR! find Python checking if "python2" can be used
gyp ERR! find Python - "python2" is not in PATH or produced an error
gyp ERR! find Python checking if "python3" can be used
gyp ERR! find Python - "python3" is not in PATH or produced an error
gyp ERR! find Python checking if the py launcher can be used to find Python 2
gyp ERR! find Python - "py.exe" is not in PATH or produced an error
gyp ERR! find Python checking if Python is C:\Python27\python.exe
gyp ERR! find Python - "C:\Python27\python.exe" could not be run
gyp ERR! find Python checking if Python is C:\Python37\python.exe
gyp ERR! find Python - "C:\Python37\python.exe" could not be run
gyp ERR! find Python
gyp ERR! find Python **********************************************************
gyp ERR! find Python You need to install the latest version of Python.
gyp ERR! find Python Node-gyp should be able to find and use Python. If not,
gyp ERR! find Python you can try one of the following options:
gyp ERR! find Python - Use the switch --python="C:\Path\To\python.exe"
gyp ERR! find Python   (accepted by both node-gyp and npm)
gyp ERR! find Python - Set the environment variable PYTHON
gyp ERR! find Python - Set the npm configuration variable python:
gyp ERR! find Python   npm config set python "C:\Path\To\python.exe"
gyp ERR! find Python For more information consult the documentation at:
gyp ERR! find Python https://github.com/nodejs/node-gyp#installation
gyp ERR! find Python **********************************************************
gyp ERR! find Python
gyp ERR! configure error
gyp ERR! stack Error: Could not find any Python installation to use
gyp ERR! stack     at PythonFinder.fail (C:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\lib\find-python.js:307:47)
gyp ERR! stack     at PythonFinder.runChecks (C:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\lib\find-python.js:136:21)
gyp ERR! stack     at PythonFinder.<anonymous> (C:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\lib\find-python.js:225:16)
gyp ERR! stack     at PythonFinder.execFileCallback (C:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\lib\find-python.js:271:16)
gyp ERR! stack     at exithandler (child_process.js:315:5)
gyp ERR! stack     at ChildProcess.errorhandler (child_process.js:327:5)
gyp ERR! stack     at ChildProcess.emit (events.js:315:20)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:275:12)
gyp ERR! stack     at onErrorNT (internal/child_process.js:465:16)
gyp ERR! stack     at processTicksAndRejections (internal/process/task_queues.js:80:21)
gyp ERR! System Windows_NT 10.0.19042
gyp ERR! command "C:\\Program Files\\nodejs\\node.exe" "C:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild"
gyp ERR! cwd C:\dev\gitrepo\sls-experiment\node_modules\snappy
gyp ERR! node -v v14.15.3
gyp ERR! node-gyp -v v5.1.0
gyp ERR! not ok
npm WARN sls-nodejs-typescript-experiment@1.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.2 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: snappy@6.3.5 (node_modules\snappy):
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: snappy@6.3.5 install: `prebuild-install || node-gyp rebuild`
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: Exit status 1

+ serverless-mysql@1.5.4
added 6 packages from 17 contributors and audited 909 packages in 12.271s

74 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```
