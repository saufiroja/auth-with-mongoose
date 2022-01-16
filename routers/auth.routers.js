const router = require('express').Router();

const { signup, login } = require('../controllers/auth.controllers');
const { verifyUser } = require('../middlewares/jwt.middlewares');

router.post('/signup', signup);
router.post('/login', login);

router.get('/who', verifyUser, (req, res, next) => {
  return res.send('hello');
});

module.exports = router;
