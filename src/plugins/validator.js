export const validateRules = {
  isTel: {
    messages: {
      zh: () => '请输入正确手机号码',
      cn: () => '请输入正确手机号码'
    },
    validate(value) {
      value = `${value}`;

      return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
  },
  isDig: {
    messages: {
      zh: () => '请输入0-1000内的整数',
      cn: () => '请输入0-1000内的整数'
    },
    validate(value) {
      value = `${value}`;
      return !value.includes('.')
    }
  },
  isCode: {
    messages: {
      zh: () => '请输入正确的验证码',
      cn: () => '请输入正确的验证码'
    },
    validate(value) {
      return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
  },
  isChinese: {
    messages: {
      zh: () => '请输入中文',
      cn: () => '请输入中文'
    },
    validate(value) {
      return /^[\u4E00-\u9FA5]{2,}$/.test(value)
    }
  }
}
