class ClockComponent {
  constructor(parent, tag = "div", className = "") {
    this.element = document.createElement(tag);
    this.element.className = className;
    parent.appendChild(this.element);
  }
}

class SevenSegmentDigit extends ClockComponent {
  static segmentMap = {
    0: "abcedf",
    1: "bc",
    2: "abged",
    3: "abgcd",
    4: "fgbc",
    5: "afgcd",
    6: "afgcde",
    7: "abc",
    8: "abcdefg",
    9: "abcfgd"
  };

  constructor(parent) {
    super(parent, "div", "digit");
    this.segments = {};

    for (const seg of ["a", "b", "c", "d", "e", "f", "g"]) {
      const el = document.createElement("div");
      el.className = `segment ${seg}`;
      this.element.appendChild(el);
      this.segments[seg] = el;
    }
  }

  setDigit(value) {
    const active = SevenSegmentDigit.segmentMap[value] || "";
    for (const [seg, el] of Object.entries(this.segments)) {
      el.classList.toggle("on", active.includes(seg));
    }
  }
}

class Colon extends ClockComponent {
  constructor(parent) {
    super(parent, "div", "colon");
    this.element.innerHTML = `
      <div class="dot"></div>
      <div class="dot"></div>
    `;
  }
}

class Clock {
  constructor(rootId) {
    const container = document.getElementById(rootId);
    this.digits = [];

    for (let i = 0; i < 8; i++) {
      if (i === 2 || i === 5) {
        new Colon(container);
      } else {
        this.digits.push(new SevenSegmentDigit(container));
      }
    }

    this.update();
    setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date();
    const timeDigits = [
      ...String(now.getHours()).padStart(2, "0"),
      ...String(now.getMinutes()).padStart(2, "0"),
      ...String(now.getSeconds()).padStart(2, "0")
    ].map(Number);

    this.digits.forEach((digit, i) => digit.setDigit(timeDigits[i]));
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new Clock("clock");
});
