export const validate = {
  empty2: (payload) => {
    const { value, message } = payload;

    if (!value) {
      // console.log(message);

      alert(message);

      return true;
    }
  },
  require: (payload) => {
    const { id, password, confirm, name, email } = payload;

    if (!id || !password || !confirm || !name || !email) {
      // console.log('필수 정보를 입력해 주세요.');

      alert('필수 정보를 입력해 주세요.');

      return true;
    }
  },
  empty: (payload) => {
    const { key, value } = payload;

    if (!value) {
      // console.log(`${key} 중복 확인을 해주세요.`);

      alert(`${key} 중복 확인을 해주세요.`);

      return true;
    }
  },
  id: (payload) => {
    const { id, refs } = payload;

    if (!id) {
      // console.log('아이디를 입력해 주세요.');

      alert('아이디를 입력해 주세요.');

      return true;
    }

    if (!RegExp(/^[A-Za-z0-9_.-]{4,12}$/).test(id)) {
      // console.log('아이디는 알파벳 소문자, 대문자와 숫자 - . _만 입력 가능하고 4자리 이상 8자리 이하로 입력해 주세요.');

      alert('아이디는 알파벳 소문자, 대문자와 숫자 - . _만 입력 가능하고 4자리 이상 8자리 이하로 입력해 주세요.');

      refs.id.focus();

      return true;
    }
  },
  password: (payload) => {
    const { password, refs } = payload;

    if (!RegExp(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\|[\]{};:'",.<>/?]).{8,16}$/).test(password)) {
      // console.log('패스워드는 알파벳 소문자와 숫자, 특수문자를 하나 이상 포함하고 6자리 이상 12자리 이하로 입력해 주세요.');

      alert('패스워드는 알파벳 소문자와 숫자, 특수문자를 하나 이상 포함하고 6자리 이상 12자리 이하로 입력해 주세요.');

      refs.password.focus();

      return true;
    }
  },
  confirm: (payload) => {
    const { password, confirm, refs } = payload;

    if (password !== confirm) {
      // console.log('입력하신 패스워드가 일치하지 않습니다.');

      alert('입력하신 패스워드가 일치하지 않습니다.');

      refs.confirm.focus();

      return true;
    }
  },
  name: (payload) => {
    const { name, refs } = payload;

    if (!name) {
      // console.log('이름을 입력해 주세요.');

      alert('이름을 입력해 주세요.');

      return true;
    }

    if (!RegExp(/^[가-힣a-zA-Z0-9]{2,6}$/).test(name)) {
      // console.log('닉네임은 한글과 알파벳, 숫자만 입력 가능하고 2자리 이상 6자리 이하로 입력해 주세요.');

      alert('닉네임은 한글과 알파벳, 숫자만 입력 가능하고 2자리 이상 6자리 이하로 입력해 주세요.');

      refs.name.focus();

      return true;
    }
  },
  email: (payload) => {
    const { email, refs } = payload;

    if (!email) {
      // console.log('이메일을 입력해 주세요.');

      alert('이메일을 입력해 주세요.');

      return true;
    }

    if (!RegExp(/^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/).test(email)) {
      // console.log('이메일을 바르게 입력해 주세요.');

      alert('이메일을 바르게 입력해 주세요.');

      refs.email.focus();

      return true;
    }
  }
};

export const transport = {
  event: ({ event, action }) => {
    if (event) action();
  }
};
