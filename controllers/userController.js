const userService = require("../services/userService");

const getAll = async (req, res) => {
  const { status, status_code, message, data } = await userService.getAll();

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const deleteByID = async (req, res) => {
  const { id } = req.params;

  const { status, status_code, message, data } = await userService.deleteByID({ id });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { getAll, deleteByID };
