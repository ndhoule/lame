import extend from 'lodash.assign';

var context = {
  // FIXME: In Node (and some other environments) Object.create(null) still sets
  // the __proto__ property. This lookup is subject to this problem. Fix by
  // prefixing keys before insertion
  find(variable) {
    if (variable in this.locals) {
      return this.locals[variable];
    }

    if (this.parentContext !== null) {
      return this.parentContext.find(variable);
    }

    throw new ReferenceError(`${variable} is not defined`);
  },

  def(variable, value) {
    return this.locals[variable] = value;
  }
};

var Context = function(locals = {}, parentContext = null) {
  var instance = Object.create(context);

  instance.parentContext = parentContext;
  instance.locals = extend(Object.create(null), locals);

  return instance;
};

export default Context;
