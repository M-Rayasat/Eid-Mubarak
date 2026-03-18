# Eid Mubarak Website

A modern, responsive Eid wishing website created by Muhammad Rayasat.

## Features

- Animated hero section with stars and moon
- Interactive questions section with smooth transitions
- Media gallery with lightbox preview
- Heartfelt wishes section with animated text
- Confetti animation on form submission
- Background music toggle (Eid nasheed)
- Fully responsive design
- LocalStorage for saving user responses
- Dark Green, Black, and Yellow theme

## Setup

1. Open `index.html` in your browser
2. (Optional) Add an Eid nasheed audio file named `eid-nasheed.mp3` in the same directory for background music
3. (Optional) Replace placeholder images in the media section with actual photos

## Structure

- `index.html` - Main HTML structure
- `styles.css` - All styling and animations
- `script.js` - Interactive functionality and animations

## Customization

### Adding Images to Media Gallery
Replace the placeholder divs in the media section with actual images:

```html
<div class="media-item" data-type="image">
    <img src="your-image.jpg" alt="Eid Photo">
</div>
```

### Background Music
Add an MP3 file named `eid-nasheed.mp3` to enable background music, or update the audio source in `index.html`:

```html
<audio id="backgroundMusic" loop>
    <source src="your-audio-file.mp3" type="audio/mpeg">
</audio>
```

### Colors
Modify CSS variables in `styles.css`:

```css
:root {
    --dark-green: #0d4d3d;
    --light-green: #1a7a5e;
    --black: #0a0a0a;
    --yellow: #ffd700;
    --gold: #ffb800;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

Created with love by Muhammad Rayasat
Eid 2026
