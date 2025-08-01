# Tic Tac Toe Game

A modern, responsive implementation of the classic Tic Tac Toe game built with HTML, CSS, and JavaScript. This project demonstrates clean code architecture using the Module Pattern and Factory Functions.

![Tic Tac Toe Game Preview](preview.png) <!-- You can add a screenshot if you have one -->

## Features

- **Two-player gameplay**: Play against a friend on the same device
- **Custom player names**: Personalize the gaming experience by setting custom player names
- **Responsive design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with visual feedback
- **Game state management**: Tracks game progress, win conditions, and draws
- **Modal dialogs**: Elegant overlays for game results and player name input

## Technologies Used

- **HTML5**: Semantic markup and modern dialog elements
- **CSS3**: Custom properties (variables), Flexbox, Grid layout, and responsive design
- **JavaScript**: ES6+ features including modules, factory functions, and arrow functions
- **Module Pattern**: Clean code organization with encapsulation

## Project Structure

The game follows a modular architecture pattern with clear separation of concerns:

- **GameBoard Module**: Manages the game state and board logic
- **GameController Module**: Handles game flow, turns, and win conditions
- **UIController Module**: Manages all user interface interactions and updates
- **Player Factory Function**: Creates player objects with customizable names

## How to Play

1. Open [index.html](file:///home/muhammadkhizar/Desktop/software-development/projects/full-stack-web-development/tic-tac-toe/index.html) in your web browser
2. Players take turns clicking on the grid to place their mark (X or O)
3. The first player to get 3 of their marks in a row (horizontally, vertically, or diagonally) wins
4. If all squares are filled with no winner, the game ends in a draw
5. Use the "Set Players Name" button to customize player names
6. Use the "Reset Game" button to start a new game at any time

## Code Highlights

- **Factory Function Pattern**: Used for creating player objects with encapsulated properties
- **Module Pattern**: Implements game modules with private and public methods
- **Event Delegation**: Efficiently handles user interactions
- **DOM Manipulation**: Updates UI in real-time based on game state
- **Form Validation**: Ensures proper input for player names

## Browser Support

This game is compatible with modern browsers that support ES6+ JavaScript features and the `<dialog>` element:

- Chrome 37+
- Firefox 53+
- Safari 15.4+
- Edge 79+

## Author

**Muhammad Khizar** - [mhmkhizar](https://github.com/mhmkhizar)

Created as part of The Odin Project curriculum.

## License

This project is open source and available under the [MIT License](LICENSE). <!-- Add a LICENSE file if you have one -->
