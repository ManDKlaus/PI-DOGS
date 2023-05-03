export function handlerFootPrints() {
    const blocks = document.querySelectorAll(".block");
    blocks.forEach((block) => {
      const size = getRandomInt(20, 60);
      block.style.transform = `scale(${Math.random() * (2 - 1) + 1})`;
      block.style.top = `${getRandomInt(0, window.innerHeight)}px`;
      block.style.left = `${getRandomInt(0, window.innerWidth)}px`;
      block.style.transform = `rotate(${getRandomInt(0, 360)}deg)`;
      block.style.width = `${size}px`;
      block.style.height = `${size}px`;
    });
};
      
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}