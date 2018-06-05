# KittyGlitter
The main app in which users will find foster-parents for kitties with glitter on them
## Dev setup
### Install Docker
https://www.docker.com/community-edition
- you might have to enable virtualization in BIOS

### Use VSCode
#### Use Cmder for windows
Update your VSCode user settings to use cmder as integrated terminal
"terminal.integrated.shell.windows": "C:\\WINDOWS\\sysnative\\cmd.exe", "terminal.integrated.shellArgs.windows" : ["/K","C:\\cmder\\vendor\\init.bat"]
### Install git
#### set-up your ssh-agent
Set-up your git with ssh, so that you don't have to enter the credentials all the time https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/

#### set-up your git config
Find where the git config files are and update them accordingly `git config --list --show-origin`

## Client-React Setup
### Install Packages
```
npm install
```
or
```
yarn install
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
