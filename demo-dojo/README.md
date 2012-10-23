Some things to install
===========================

```
sudo apt-get install nodejs
sudo apt-get install npm

sudo npm config set registry http://registry.npmjs.org/
sudo npm install -g node-static
```

Set the node.js modules path
============================
```
export NODE_PATH=$NODE_PATH:/usr/local/lib/node_modules
source .bashrc
```