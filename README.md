# KittyGlitter
The main app in which users will find foster-parents for kitties with glitter on them
## Dev setup
### Install Docker
### Use VSCode
#### Use Cmder for windows
Update your VSCode user settings to use cmder as integrated terminal
"terminal.integrated.shell.windows": "C:\\WINDOWS\\sysnative\\cmd.exe", "terminal.integrated.shellArgs.windows" : ["/K","C:\\cmder\\vendor\\init.bat"]
### Install git
#### set-up your git config 
Find where the git config files are and update them accordingly `git config --list --show-origin`

## FireBaseClient Setup
### Install FireBase Tools https://github.com/firebase/firebase-tools
```
npm install -g firebase-tools
```
### Login to Firebase
From the commandline inside ~/FireBaseClient/ from terminal/powershell
```
firebase login
```

Follow instructions to:
1) Login with with your account
2) Set project to 'KittyGlitter'

### Serve client locally
```
firebase serve -p 4761
```

## Backend Setup
### Install Packages
```
npm install
```
### Start Express Server
```
node index.js
```
