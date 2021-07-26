const userService = require('../../services/auth');
const { authValidateSchema } = require('../../utils/schema');

const registr = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = authValidateSchema.validate(req.body);
  if (error) {
    const message = error.details.message;
    res.status(400).json({
      status: 'Bad requst',
      code: 400,
      data: error.message,
    });
    console.log(error);
    return;
  }

  const result = await userService.getOne({ email });
  console.log(result);
  if (result) {
    res.status(409).json({
      status: 'Conflict',
      code: 409,
      message: 'Email in use',
    });
    return;
  }
  try {
    await userService.add({ email, password });
    res.status(201).json({
      status: 'Success',
      code: 201,
      message: 'Registrtion success',
    });
  } catch (error) {
    next(error);
    // res.status(400).json({
    //   status: 'Error',
    //   code: 400,
    //   message: 'Bad request',
    // });
  }
};

module.exports = registr;
