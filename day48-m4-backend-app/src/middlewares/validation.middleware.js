const { sendError } = require("../utils/response.utils.js");

const patterns = {
  name: /^[a-zA-Z\s]{2,50}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^[6-9]\d{9}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/,
  trainNumber: /^\d{5}$/,
  city: /^[a-zA-Z\s\-]{2,50}$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
  time: /^(?:[01]\d|2[0-3]):[0-5]\d$/,
  id: /^[a-zA-Z0-9_\-]+$/,
  pnr: /^[a-zA-Z0-9]{6,12}$/,
  positiveInteger: /^[1-9]\d*$/,
  positiveNumber: /^[1-9]\d*(\.\d{1,2})?$/
};

const isValidDate = (dateStr) => {
  if (!patterns.date.test(dateStr)) return false;
  const [yearStr, monthStr, dayStr] = dateStr.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

const trimValues = (obj) => {
  if (!obj || typeof obj !== "object") return;
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].trim();
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      trimValues(obj[key]);
    }
  }
};

const validateTarget = (schemaRules, targetProp) => {
  return (req, res, next) => {
    const data = req[targetProp] || {};
    trimValues(data);

    const errors = [];

    for (const field of Object.keys(schemaRules)) {
      const rule = schemaRules[field];
      const val = data[field];
      const isMissing = val === undefined || val === null || val === "";

      if (rule.required && isMissing) {
        errors.push({
          field,
          message: rule.message || `${field} is required`
        });
        continue;
      }

      if (!isMissing) {
        if (rule.pattern && !rule.pattern.test(String(val))) {
          errors.push({
            field,
            message: rule.message || `${field} is invalid`
          });
          continue;
        }

        if (typeof rule.validator === "function") {
          const isValid = rule.validator(val, data);
          if (!isValid) {
            errors.push({
              field,
              message: rule.message || `${field} is invalid`
            });
          }
        }
      }
    }

    if (errors.length > 0) {
      return sendError(res, 400, "Validation failed", errors);
    }

    next();
  };
};

const validateBody = (schemaRules) => validateTarget(schemaRules, "body");
const validateParams = (schemaRules) => validateTarget(schemaRules, "params");
const validateQuery = (schemaRules) => validateTarget(schemaRules, "query");

module.exports = {
  patterns,
  isValidDate,
  validateBody,
  validateParams,
  validateQuery
};

