# Your task is to build a simple hangman game. Here’s how it should work:

1. Pick a random word from the attached list, and present the user with a number of empty squares, corresponding to the letters of the word.
2. Allow the user to enter a letter (any way you like: window prompt, input field, keypress event, virtual keyboard, handwriting recognition, etc.)
3. If the letter is included in the word, reveal every occurrence of it in the squares. If the word is complete, the user wins.
4. If not, we have attached a simple SVG drawing of a hangman. It should start out blank, and with each missed attempt you should reveal one more line (i.e. one more child element in the SVG). If the drawing is complete, the user loses.


To get full points, your app should also fulfil all of the below requirements:

  •Use Flux architecture for state management.

  •It should be responsive.  

  •It should have a landing page for the app that explains the rules, and a separate screen for the actual game. 
 
  •We expect an SPA. 

  •Allow the user to play more than one game without reloading the page.

  •Allow the user to set the length of the word before a new game (determine the minimum and maximum length from the list of words).

  •Present the user with a score counter that increments after every incorrect guess.

  •Allow the user to continue the previously played game after reloading the page.
  

We have attached a basic UI design scheme; implement it as closely as possible. Aside from that, please use Angular as a framework.
