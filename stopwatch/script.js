(function () {
  "use strict";

  function Stopwatch(element) {
    this.state = {
      timer: element,
      defaultTime: "00:00:00",
      startTime: 0,
      elapsedTime: 0,
      interval: null,
    };

    this.print = (text) => {
      this.state.timer.innerHTML = text;
    };

    this.addZero = (number) => {
      if (number < 10) {
        return "0" + number;
      }
      if (number > 99) {
        return number.toString().slice(0, -1);
      }
      return number;
    };

    this.timeToString = (time) => {
      const date = new Date(time);
      const min = date.getUTCMinutes();
      const sec = date.getUTCSeconds();
      const milli = date.getUTCMilliseconds();
      return `${this.addZero(min)}:${this.addZero(sec)}.${this.addZero(milli)}`;
    };

    this.startTimer = () => {
      this.state.elapsedTime = Date.now() - this.state.startTime;
      const time = this.timeToString(this.state.elapsedTime);
      this.print(time);
    };

    this.start = () => {
      clearInterval(this.state.interval);
      this.state.startTime = Date.now() - this.state.elapsedTime;
      this.state.interval = setInterval(this.startTimer.bind(this), 10);
    };

    this.stop = () => {
      clearInterval(this.state.interval);
    };

    this.reset = () => {
      clearInterval(this.state.interval);
      this.print(this.state.defaultTime);
      this.state.startTime = 0;
      this.state.elapsedTime = 0;
      this.interval = null;
    };
  }

  const get = (target) => {
    return document.querySelector(target);
  };
  const $startButton = get(".timer_button.start");
  const $stopButton = get(".timer_button.stop");
  const $resetButton = get(".timer_button.reset");
  const $timer = get(".timer");

  const stopwatch = new Stopwatch($timer);

  $startButton.addEventListener("click", () => {
    stopwatch.start();
  });
  $stopButton.addEventListener("click", () => {
    stopwatch.stop();
  });
  $resetButton.addEventListener("click", () => {
    stopwatch.reset();
  });
})();
