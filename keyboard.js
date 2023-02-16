// function isTabActive(tabIndex) {
//     return nav.children[tabIndex].style.backgroundColor === 'red'
// }
function isTabActive(className) {
  for (const btn of nav.children) {
    if (btn.className === className) {
      if (btn.style.backgroundColor === "red") {
        return true;
      } else {
        return false;
      }
    }
  }
}

function handleKeydown(event) {
  /*
option = alt
command = meta
*/
  if (event.altKey || event.metaKey) {
    return;
  }

  // if (!isTabActive(0)) {
  //     return
  // }
  if (!isTabActive("training-keyboard")) {
    return;
  }

  const key = event.key.toUpperCase();
  if (
    trainingText.innerText[0] &&
    trainingText.innerText[0].toUpperCase() !== key
  ) {
    if (!greyKeys.includes(event.keyCode)) {
      if (errors[key]) {
        errors[key] += 1;
      } else {
        errors[key] = 1;
      }
      errorCount.innerText = Number(errorCount.innerText) + 1;
      const container = concreteErrors.firstElementChild;
      renderData(errors, container);
      concreteErrors.style.display = "";
    }
    return;
  }
  if (trainingText.innerText[1] === undefined) {
    drawPictures();
  } else {
    drawPictures(trainingText.innerText[1].toUpperCase());
  }
  trainingText.innerText = trainingText.innerText.slice(1);
  let wordsTyped =
    exerciseText.split(" ").length -
    trainingText.innerText.trim().split(" ").length;
  wordTypedUser.innerText = wordsTyped;
  const btns = document.querySelectorAll(".keyboard button");
  for (let btn of btns) {
    if (btn.firstChild.textContent === key) {
      btn.style.backgroundColor = "red";
      setTimeout(function () {
        btn.style.backgroundColor = "";
      }, 200);
    }
  }
  if (trainingText.innerText === "") {
    // modal.querySelector('.total-count span').innerText = '3'
    // modal.querySelector('.error-count span').innerText = '4'
    modal.querySelector(".total-count").firstElementChild.innerText =
      exerciseText.length;
    modal.querySelector(".error-count").firstElementChild.innerText =
      errorCount.innerText;
    modal.parentElement.style.display = "";
  }
}
