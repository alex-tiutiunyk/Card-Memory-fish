import { randomIntFromInterval } from './rundomNumber';

let countBubbles = 0;

export function generateBubbles() {
  const bubble = document.createElement('span');
  const container = document.querySelector('.aquarium');

  countBubbles++;

  // create element
  bubble.classList.add('bubble', `bubble-${countBubbles}`);
  container.appendChild(bubble);

  const newBubble = document.querySelector(`.bubble-${countBubbles}`);

  // add animation
  const x = randomIntFromInterval(0, 100);
  const size = Number((randomIntFromInterval(0, 50) * 0.01).toFixed(2));
  const time = randomIntFromInterval(5000, 20000);

  if (size > 0.3) {
    newBubble.animate(
      [
        { transform: `translate(${x}vw, 10vh) translateZ(150px) scale(${size})` },
        { transform: `translate(${x}vw, -110vh) translateZ(150px) scale(${size + 0.3})` },
      ],
      {
        duration: time,
      },
    );
  } else {
    newBubble.animate(
      [
        { transform: `translate(${x}vw, 10vh) scale(${size})` },
        { transform: `translate(${x}vw, -110vh) scale(${size + 0.3})` },
      ],
      {
        duration: time,
      },
    );
  }

  // remove element
  newBubble.getAnimations()[0].finished.then(() => newBubble.remove());
}
