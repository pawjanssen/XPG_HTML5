Install Node.js
===========================
```
sudo apt-get install nodejs
sudo apt-get install npm

sudo npm config set registry http://registry.npmjs.org/
```
Alternatively:
http://davidtsadler.com/archives/2012/05/06/installing-node-js-on-ubuntu/

Install node packages
===========================
```
sudo npm install node-static
sudo npm install socket.io

```

Set the node.js modules path
============================
```
export NODE_PATH=$NODE_PATH:/usr/local/lib/node_modules
source .bashrc
```

Appfog
======
The app is deployed on Appfog: http://www.appfog.com

Console: https://console.appfog.com/
App: http://demo-dojo.eu01.aws.af.cm/

Install appfog and deploy the app:
```
gem install af
af login
af update demo-dojo
```
