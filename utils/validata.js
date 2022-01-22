const strategies = {
  isNonEmpty(value, errorMsg) {
    if (value === "") return errorMsg;
  },
  minLength(value, length, errorMsg) {
    if (value.length < length) return errorMsg;
  },
  idCard(value, errorMsg = "请正确的身份证号码") {
    // 15位数身份证正则表达式
    const arg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    // 18位数身份证正则表达式
    const arg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;

    if (
      value === "" ||
      (value.match(arg1) == null && value.match(arg2) == null)
    ) {
      return errorMsg;
    }
  },
  mobile(value, errorMsg = "请填写正确的手机号") {
    const arg1 = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|17[0-9]{1}|(18[0-9]{1})|(19[0-9 {4}]{1}))+\d{8})$/;
    if (value === "" || !arg1.test(value)) return errorMsg;
  },
  mail(value, errorMsg = "请输入正确的邮箱") {
    const arg1 = new RegExp(
      "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
    );
    if (value === "" || !arg1.test(value)) return errorMsg;
  }
};

export const Validator = function() {
  this.cache = [];
};

Validator.prototype.add = function(value, rules, errorMsg) {
  rules.forEach(item => {
    const ary = item.rule.split(":");
    this.cache.push(() => {
      const strategy = ary.shift();
      ary.unshift(value);
      ary.push(item.errorMsg);
      return strategies[strategy].apply(null, ary);
    });
  });
};
Validator.prototype.start = function() {
  for (let i = 0; i < this.cache.length; i++) {
    const validatorFunc = this.cache[i];
    const msg = validatorFunc();
    if (msg) return msg;
  }
};

/**
 *  const validator = new Validator()
 *  validator.add('13738612458',[{rule:'mobile',errorMsg:'请填写正确的手机号' }])
 *  var errorMsg = validator.start()
 *  if (errorMsg) return errorMsg
 */
