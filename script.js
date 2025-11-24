// Interactive features for Spoon-Knife demo
// Demonstrates Claude Code's ability to add modern JavaScript functionality

// Fork counter with localStorage persistence
let forkCount = parseInt(localStorage.getItem('forkCount')) || 0;

function updateForkCount() {
  document.getElementById('fork-count').textContent = forkCount;
}

// Initialize fork count
updateForkCount();

// Fork counter button handler
document.getElementById('fork-counter').addEventListener('click', () => {
  forkCount++;
  localStorage.setItem('forkCount', forkCount);
  updateForkCount();

  // Add animation feedback
  const button = document.getElementById('fork-counter');
  button.style.transform = 'scale(1.1)';
  setTimeout(() => {
    button.style.transform = '';
  }, 200);
});

// Dark theme toggle with localStorage persistence
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
}

// Theme toggle handler
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');

  // Save preference
  const isDark = body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  // Add visual feedback
  themeToggle.style.transform = 'rotate(180deg)';
  setTimeout(() => {
    themeToggle.style.transform = '';
  }, 300);
});

// Easter egg: Konami code detector
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateEasterEgg() {
  const octocat = document.getElementById('octocat');
  octocat.style.animation = 'none';
  octocat.style.transform = 'rotate(720deg) scale(1.5)';

  // Show message
  const message = document.querySelector('.message');
  const originalText = message.textContent;
  message.textContent = '🎉 You found the secret! 🎉';
  message.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)';
  message.style.backgroundSize = '200% 200%';
  message.style.animation = 'gradient 3s ease infinite';

  // Add gradient animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  document.head.appendChild(style);

  // Reset after 3 seconds
  setTimeout(() => {
    octocat.style.animation = '';
    octocat.style.transform = '';
    message.textContent = originalText;
    message.style.background = '';
    message.style.animation = '';
  }, 3000);
}

// Add keyboard shortcuts info
console.log('%c🚀 Claude Code Demo', 'font-size: 20px; font-weight: bold; color: #0969da;');
console.log('%cKeyboard shortcuts:', 'font-size: 14px; font-weight: bold;');
console.log('• Try the Konami code for a surprise!');
console.log('• Click the fork counter to increment');
console.log('• Toggle dark theme with the theme button');
