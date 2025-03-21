export function waveTextAnimation() {
  let textBox = document.querySelector('.wave-text');
  const text = textBox.textContent;
  textBox.innerHTML = '';

  text.split('').forEach((letter, i) => {
    const spanElement = document.createElement('span');
    spanElement.style.animationDelay = `${i * 0.1}s`;
    spanElement.textContent = letter;
    textBox.appendChild(spanElement);
  });

  return;
}
