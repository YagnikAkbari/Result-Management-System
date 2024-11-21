exports.getAdminPage = (req, res, next) => {
  let successMessage = req.flash("error");
  if (successMessage.length > 0) {
    successMessage = successMessage[0];
  } else {
    successMessage = null;
  }

  let errorMessage = req.flash("error1");
  if (errorMessage.length > 0) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }
  res.render("admin/admin", {
    pageTitle: "Admin",
    successMessage: successMessage,
    errorMessage: errorMessage,
  });
};

exports.getStudentData = (req, res, next) => {
  let successMessage = req.flash("error");
  if (successMessage.length > 0) {
    successMessage = successMessage[0];
  } else {
    successMessage = null;
  }

  let errorMessage = req.flash("error1");
  if (errorMessage.length > 0) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }

  res.render("admin/studentData", {
    pageTitle: "Upload Student Data",
    successMessage: successMessage,
    errorMessage: errorMessage,
  });
};
