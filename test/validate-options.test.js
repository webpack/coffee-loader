import { validate } from "schema-utils";

import check from "../src/options.check";
import schema from "../src/options.json";

import { compile, getCompiler } from "./helpers";

/**
 * @param {object} options loader options
 * @returns {boolean} whether the schema accepts them
 */
function isValid(options) {
  try {
    validate(schema, options);

    return true;
  } catch {
    return false;
  }
}

describe("validate options", () => {
  // Options that are not an object never pass the check. `validate` takes an
  // array as a list of options objects, so it accepts `[]`; the check failing
  // there only means webpack falls back to the full validation.
  for (const value of [[], "invalid", 42, null]) {
    it(`should not pass the check with ${JSON.stringify(value)}`, () => {
      expect(check(value)).toBe(false);
    });
  }

  const tests = {
    bare: {
      success: [true, false],
      // failure: [false, ''],
    },
    sourceMap: {
      success: [true, false],
      // failure: ['true'],
    },
  };

  function stringifyValue(value) {
    if (
      Array.isArray(value) ||
      (value && typeof value === "object" && value.constructor === Object)
    ) {
      return JSON.stringify(value);
    }

    return value;
  }

  async function createTestCase(key, value, type) {
    it(`should ${
      type === "success" ? "successfully validate" : "throw an error on"
    } the "${key}" option with "${stringifyValue(value)}" value`, async () => {
      // webpack trusts a check that passes and skips the schema, so the two
      // must agree on every value
      expect(check({ [key]: value })).toBe(isValid({ [key]: value }));

      const compiler = getCompiler("simple.js", { [key]: value });

      let stats;

      try {
        stats = await compile(compiler);
      } finally {
        if (type === "success") {
          expect(stats.hasErrors()).toBe(false);
        } else if (type === "failure") {
          const {
            compilation: { errors },
          } = stats;

          expect(errors).toHaveLength(1);
          expect(() => {
            throw new Error(errors[0].error.message);
          }).toThrowErrorMatchingSnapshot();
        }
      }
    });
  }

  for (const [key, values] of Object.entries(tests)) {
    for (const type of Object.keys(values)) {
      for (const value of values[type]) {
        createTestCase(key, value, type);
      }
    }
  }
});
