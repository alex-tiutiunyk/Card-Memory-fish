export function waveTextAnimation() {
  // find all tags with .wave-text class
  const textBox = document.querySelectorAll('.wave-text');

  // create empty array for texts
  const texts = [];

  textBox.forEach((item) => {
    // add text from tag to texts
    texts.push(item.textContent);
    // clear tag
    item.innerHTML = '';
  });

  textBox.forEach((textElement, i) => {
    texts[i].split('').forEach((letter, i) => {
      const spanElement = document.createElement('span');
      spanElement.style.display = 'inline-block';
      spanElement.style.verticalAlign = 'bottom';
      spanElement.style.animation = 'wave 1.5s ease-in-out infinite';
      spanElement.style.animationDelay = `${i * 0.1}s`;
      spanElement.textContent = letter;
      textElement.appendChild(spanElement);
    });
  });
}
