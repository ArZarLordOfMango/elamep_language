function playSound(button) {
  const soundFile = button.dataset.sound;
  const audio = new Audio(soundFile);
  audio.play();
}
