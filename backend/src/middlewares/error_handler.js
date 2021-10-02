"use strict";

// Custom error handling middleware.
module.exports = function (options) {
  if (!options || Object.keys(options).length === 0) {
    options = {
      includeDetails: false,
    };
  }
  function renderDetailedError(err, req, res) {
    // Strip the line breaks out of the err stack as it causes multiple entries in Papertrail.
    const errParts = ["API error: url=" + req.originalUrl];
    if (typeof err === "string") {
      errParts.push(err);
    }
    if (err.message) {
      errParts.push(err.message);
    }
    if (err.stack && err.stack.replace) {
      errParts.push(err.stack.replace(/(\r\n|\n|\r)/gm, ""));
    }
    console.log(errParts.join(", "));
    // Intentionally returning a JSON response rather than JSONP since browsers will not
    // inject javascripts that return a 500.
    res.status(err.status || 500).json({
      url: req.originalUrl,
      message: err.message,
      stack: err.stack,
    });
  }

  return function (err, req, res) {
    if (!res.headersSent) {
      // just because of your current problem, no need to exacerbate it.
      if (err) {
        console.log(err.stack);
      }
      if (options.includeDetails === true) {
        renderDetailedError(err, req, res);
      } else {
        res.status(500).json({ message: "server error" });
      }
    }
  };
};
