/**
 * A set of functions called "actions" for `charge`
 */

export default {
  exampleAction: async (ctx, next) => {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },
  token: async (ctx, next) => {

  }
};
