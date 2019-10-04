This is a chess application built using React. adding a <Board /> component to your application will generate a new chess game.

All chess rules are applied - i.e., check, checkmate, castling, en passant and pawn promotion all work. 

The board and pieces will dynamically resize to screen size, and currently drag and drop moves are supported. 

TODO

    Mentor questions:
        PieceList and Piece snapshot require a lot of different props. 
        Should I just pass a bunch of stand-in props? 
        Or is that a sign that my data organization/distribution is flawed?

    Bugs to address:
        when an enemy pawn is 1 square directly in front of the player king, it registers as an attack when it shouldn't
        when pawns promote, if they're on the d-file, it causes an error due to conflicting keys
        on promoting a pawn, warning: cannot perform a react state update on an unmounted component
        verify checkmate works under all cases - rook with rook did not register -- was a timing issue. Bot moved immediately after player moved, state hadn't updated in time
        undo adds a duplicate piece to piecelist (does not display, though). Might not be a persistent problem once I change how I test it

    
    Short term goals;
        display piece graveyard
        display point differential
        spin board and allow 2P 1 comp play
        integrate smoke and snapshot tests


    Long term goals:
        Set up minimax algo with alpha/beta pruning to create a rudimentary bot
        touch controls
        pawns auto-promote to queens - add option for rook, knight, or bishop
        add option to hightlight valid moves
        integrate customizable turn timer
        create websocket to allow online play
        create chat
        create username/avatar info and display
        Chess opening explorer?
        chess puzzles?



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
