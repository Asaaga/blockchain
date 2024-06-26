const Member = require('../models/users');
const Transaction = require('../models/transaction');
const database = require('../models');

let BlockChain = require('../blockChain');

let blockChain = new BlockChain();

let hash = require('object-hash');

exports.getIndex = (req, res, next) => {
  res.render('index', {
    pageTitle: 'HOME',
    path: '/',
  });
};
exports.getDashboard = (req, res, next) => {
  Member.find().then(() => {
    res.render('dashboard', {
      pageTitle: 'Dashboard',
      path: '/dashboard',
    });
  });
};
exports.getAdminDashboard = (req, res, next) => {
  Member.find().then((members) => {
    res.render('adminDashboard', {
      pageTitle: 'Admin Dashboard',
      path: '/admin-dashboard',
      members: members,
    });
  });
};
exports.getTransactions = (req, res, next) => {
  Transaction.find().then((transactions) => {
    res.render('transactions', {
      pageTitle: 'Admin Dashboard',
      path: '/admin-dashboard',
      transactions: transactions,
    });
  });
};

exports.postAdminDeleteMember = (req, res, next) => {
  const memberId = req.body.memberId;
  Member.findByIdAndDelete(memberId)
    .then((result) => {
      res.redirect('/admin-dashboard');
    })
    .catch((error) => {
      console.log(error);
    });
};
//get the verify payment reference
exports.getVerifyPayment = (req, res, next) => {
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: `/transaction/verify/${req.query.reference}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    },
  };

  https
    .request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(JSON.parse(data));
      });
    })
    .on('error', (error) => {
      error.httpStatusCode = 500;
      return next(error);
    });
  console.log(req.query.reference);
};

var secret = process.env.PAYSTACK_SECRET_KEY;
// Using Express
exports.postPayStackWebHook = (req, res) => {
  //validate event
  const hash = crypto
    .createHmac('sha512', secret)
    .update(JSON.stringify(req.body))
    .digest('hex');
  if (hash == req.headers['x-paystack-signature']) {
    // Retrieve the request's body
    const event = req.body;
    console.log(event);

    blockChain.addNewTransaction('James', 'Simon', 2000);
    blockChain.addNewBlock(null);

    // Do something with event
  }
  res.send(200);
};

exports.getTest = (req, res, next) => {
  res.render('test', {
    pageTitle: 'test',
    path: '/admin-dashboard',
  });
};

// add transaction manually
exports.postAddTransaction = (req, res) => {
  const email = req.body.email;
  const fullName = req.body.full_name;
  const amount = req.body.amount;

  blockChain.addNewTransaction({ email, fullName }, 'BC-Wallet', amount);
  blockChain.addNewBlock(null);
  // const newtrans = new Transaction({

  // })
};
