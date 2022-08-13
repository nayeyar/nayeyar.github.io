// Color variables:
red = [0, 100, 63];
orange = [40, 100, 60];
green = [75, 100, 40];
blue = [196, 77, 55];
purple = [280, 50, 60];

// Color variables:
red = [0, 100, 63];
orange = [140, 30, 50];
green = [75, 100, 40];
blue = [196, 77, 25];
purple = [80, 50, 70];

// Letters in the message will cycle through these colors:
letterColors = [red, orange, green, blue, purple];

// This variable controls the smallest distance at which a mouse will make the dots react
mouseResponseThreshold =70;

// This variable controls how strongly the dots will try to return to their starting position
friction = 0.5;

// This variable controls how much the dots will rotate when interacting
rotationForce = 0.02;

// message = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum ab nihil ut cumque, fuga molestias doloribus laudantium quis accusantium minima pariatur labore repellendus, illum soluta deserunt saepe earum quaerat? Quae!';

message = 'Thank you';

// Draw some text to the screen:
drawName(message);
// single color
// drawName(message, purple);
// multi color
// drawName(message, letterColors);

// Animate the text!
bounceBubbles();
