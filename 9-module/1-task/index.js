export default function promiseClick(button) {
  return new Promise((resolve, reject) => {
    button.addEventListener(
      "click",
      (e) => {
        if (e) {
          resolve(e);
        } else {
          reject();
        }
      },
      { once: true }
    );
  });
}
