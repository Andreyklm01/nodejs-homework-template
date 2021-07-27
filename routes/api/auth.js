const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
// const { authenticate } = require('../../middlewares/authMiddlware');
const passport = require('passport');
require('../../configs/passport-config');
router.post('/users/signup', ctrl.registr);
router.post('/users/login', ctrl.login);

// const authenticate = (req, res, next) => {
//   passport.authenticate(
//     'jwt',
//     { session: false },
//     (error, user) => {
//       if (error || !user || !user.token) {
//         res.status(401).json({
//           status: 'error',
//           code: 401,
//           message: 'Unathorized',
//         });
//         return;
//       }
//       req.user = user;
//       console.log(user);
//       next();
//     },
//     (req, res, next),
//   );
// };

// Не работает
router.post('/users/logout', ctrl.logout);

module.exports = router;
