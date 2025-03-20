import { randomIntFromInterval } from './rundomNumber';

let countFishes = 0;

export function generateFish() {
  const fish = document.createElement('div');
  const container = document.querySelector('.aquarium');

  const fishType = randomIntFromInterval(1, 6);
  const direction = randomIntFromInterval(0, 1);
  const yStart = randomIntFromInterval(10, 90);
  const yFinish = randomIntFromInterval(10, 90);
  const z = randomIntFromInterval(10, 120);
  const size = Number((randomIntFromInterval(10, 90) * 0.01).toFixed(2));
  const time = randomIntFromInterval(5000, 30000);

  countFishes++;

  // create element
  fish.classList.add('fish', `fish-${fishType}`, `fish-count-${countFishes}`);
  container.appendChild(fish);

  const newFish = document.querySelector(`.fish-count-${countFishes}`);

  if (direction === 0) {
    newFish.animate(
      [
        { transform: `translate(-10vw, ${yStart}vh) translateZ(${z}px) scale(${size})` },
        { transform: `translate(110vw, ${yFinish}vh) translateZ(${z}px) scale(${size + 0.3})` },
      ],
      {
        duration: time,
      },
    );
  } else {
    newFish.animate(
      [
        {
          transform: `translate(110vw, ${yStart}vh) translateZ(${z}px) scale(${size}) rotateY(180deg)`,
        },
        {
          transform: `translate(-10vw, ${yFinish}vh) translateZ(${z}px) scale(${
            size + 0.3
          }) rotateY(180deg)`,
        },
      ],
      {
        duration: time,
      },
    );
  }

  // remove element
  newFish.getAnimations()[0].finished.then(() => newFish.remove());
}
