const database = require('./database');

database.onConnect(() => {
  let BlockChain = require('./blockChain');

  let blockChain = new BlockChain();

  let hash = require('object-hash');

  blockChain.addNewTransaction('James', 'Simon', 2000);
  blockChain.addNewBlock(null);

  console.log('Chain: ', blockChain.chain);
});
