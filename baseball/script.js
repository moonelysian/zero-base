(() => {
  "use strict";

  const get = (target) => document.querySelector(target);

  const baseball = {
    password: "",
    limit: 10,
    digit: 4,
    trial: 0,
    end: false,
    $question: get(".ball_question"),
    $answer: get(".ball_answer"),
    $input: get(".ball_input"),
  };

  const { limit, digit, $question, $answer, $input } = baseball;
  let { trial, end } = baseball;

  const setPassword = () => {
    const gameLimit = Array(limit).fill(false);
    let password = "";
    while (password.length < digit) {
      const random = parseInt(Math.random() * 10, 10);

      if (gameLimit[random]) {
        continue;
      }
      password += random;
      gameLimit[random] = true;
    }

    baseball.password = password;
  };
  const onPlay = (number, hint) => {
    /*
      number: 유저가 입력한 숫자
      hint: 
      */
    return `<em>${trial}차 시도</em>: ${number}, ${hint}`;
  };
  const isCorrect = (number, answer) => {
    return number === answer;
  };
  const isDuplicate = (number) => {
    return [...new Set(number.split(""))].length !== digit;
  };
  const getStrikes = (number, answer) => {
    let strike = 0;
    const splitedNumber = number.split("");
    splitedNumber.map((num, index) => {
      if (num === answer[index]) {
        strike += 1;
      }
    });
    return strike;
  };
  const getBalls = (number, answer) => {
    let ball = 0;
    const splitedNumber = number.split("");

    splitedNumber.map((num, index) => {
      const idx = answer.indexOf(num);
      if (idx > -1 && idx !== index) {
        ball += 1;
      }
    });
    return ball;
  };

  const getResult = (number, answer) => {
    if (isCorrect(number, answer)) {
      end = true;
      $answer.innerHTML = baseball.password;
      return "홈런";
    }
    const strike = getStrikes(number, answer);
    const ball = getBalls(number, answer);
    console.log(strike, ball);
    return `스트라이크: ${strike}개, 볼: ${ball}개`;
  };
  const playGame = (e) => {
    e.preventDefault();
    if (!!end) {
      return;
    }
    const inputNumber = $input.value;
    const { password } = baseball;
    if (inputNumber.length !== digit) {
      return alert(`${digit}자리 숫자를 입력해주세요.`);
    }
    if (isDuplicate(inputNumber)) {
      return alert("중복 숫자가 있습니다.");
    }
    trial += 1;
    const result = onPlay(inputNumber, getResult(inputNumber, password));
    $question.innerHTML += `<span>${result}</span>`;

    if (limit <= trial && !isCorrect(inputNumber, password)) {
      alert("쓰리아웃");
      end = true;
      $answer.innerHTML = password;
    }
    $input.value = "";
    $input.focus();
  };

  const init = () => {
    get("form").addEventListener("submit", (e) => playGame(e));
    setPassword();
  };

  init();
})();
