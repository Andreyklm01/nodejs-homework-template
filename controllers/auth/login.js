const userService = require('../../services/auth');
const jwt = require('jsonwebtoken');
const bCrypt = require('bcryptjs');
const { authValidateSchema } = require('../../utils/schema');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  const { error } = authValidateSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 'Bad requst',
      code: 400,
      data: error.message,
    });
    console.log(error);
    return;
  }

  try {
    const user = await userService.getOne({ email });

    if (!user || !user.comparePassword(password)) {
      res.status(401).json({
        status: 'Unauthorized',
        code: 401,
        message: 'Wrong name or password',
      });
    }
    // Добавить пасспорт, создать токен
    res.status(200).json({
      status: 'success',
      code: 200,
      message: req.body,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
