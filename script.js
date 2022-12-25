const lengthSlider = document.querySelector(".pass-length input");

const generateBtn = document.querySelector(".generate-btn");

options = document.querySelectorAll(".option input");

copyIcon = document.querySelector(".input-box span");

passwordInput = document.querySelector(".input-box input");

passIndicator = document.querySelector(".pass-indicator");

//object of letters ,numbers & symbols
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%|[](){}:;.,*+-#@<>~",
};

const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;
  //looping through each options checkbox
  options.forEach((option) => {
    //if checkbox is checked
    if (option.checked) {
      //if checkbox id isn't exc-duplicate && spaces
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        //adding particular key value from character object to staticPassword
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        //if checkbox id is spaces
        //adding spaces at the beginning and end of static password
        staticPassword += `   ${staticPassword}   `;
      } else {
        //else pass true value to excludeDuplicate
        excludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    //getting random character from the static password
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      // if excludeDuplicate is true
      //if randomPassword  doesn't contains the current random character or randomChar is equal
      //to spaces " " then add random character to randomPassword else decrement i by 1-

      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      //else add random character to randomPassword
      randomPassword += randomChar;
    }
  }

  //passing randomPassword to passwordinput value
  passwordInput.value = randomPassword;
};

const updatePassSlider = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

const updateSlider = () => {
  //passing slider value as counter text
  // if lengthSlider value is less than 8 then pass "weak" as passIndicator id else if lengthSlider
  // value is less than 16 then pass "medium" as id else pass "strong" as id

  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  updatePassSlider();
};

updateSlider();

const copyPassword = () => {
  //copying random password
  navigator.clipboard.writeText(passwordInput.value);
  //changing copy icon to tick
  copyIcon.innerText = "check";

  setTimeout(() => {
    //after 1500ms change tick icon to copy
    copyIcon.innerText = "copy_all";
  }, 1500);
};

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
