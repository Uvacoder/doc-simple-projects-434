
////////////////////
// DEFINE PLAYERS //
////////////////////


class Player {
    constructor ( name, checker ) {
        this.name = name;
        this.checkerColor = checker;
    }
}


// define two players
const player1 = new Player( 'Player 1', 'red' );
const player2 = new Player( 'Player 2', 'yellow' );



//////////////////////
// GLOBAL VARIABLES //
//////////////////////


// creates an array containing all of the board's cells
// need this in order to match with win condition array
const boardCells = $( 'div.cell' ).toArray();

// track how many games each of the players have won
let player1Wins = 0;
let player2Wins = 0;

// tracks how many plays have been made and determines whose turn it is
// ODD = player that goes first & EVEN = player that goes second
let turn = 0;

// player turn text
const player1Turn = `${ player1.name }'s turn`;
const player2Turn = `${ player2.name }'s turn`;

// change player checker color with player turn text
const player1Checker = `${ player1.checkerColor }`;
const player2Checker = `${ player2.checkerColor }`;

// show whoes turn it is on page load
$( '.circle').addClass( player1Checker );
$( '.player-turn' ).text( player1Turn );



//////////////////////
// CLEAR GAME BOARD //
//////////////////////


const clearBoard = () => {

    // reset turn to 0
    turn = 0;

    // remove classes from boardCells
    for ( let i = 0; i < boardCells.length; i++ ) {
        $( boardCells[i] ).removeClass( 'filled red yellow' );
    }

    // reset turn text to first player
    $( '.circle').removeClass( player2Checker ).addClass( player1Checker );
    $( '.player-turn' ).empty().text( player1Turn );

}



//////////////////////
// CLEAR GAME SCORE //
//////////////////////


const clearScore = () => {

    // reset player wins to 0
    player1Wins = 0;
    player2Wins = 0;

    // reset score filler text to 0
    $( 'div .player1 .score' ).empty().text( '0' );
    $( 'div .player2 .score' ).empty().text( '0' );

}



///////////////////////////
// DEFINE WIN CONDITIONS //
///////////////////////////


const winConditions = [
    // vertical win conditions
    [  0,  1,  2,  3 ], [  1,  2,  3,  4 ], [  2,  3,  4,  5 ],
    [  6,  7,  8,  9 ], [  7,  8,  9, 10 ], [  8,  9, 10, 11 ],
    [ 12, 13, 14, 15 ], [ 13, 14, 15, 16 ], [ 14, 15, 16, 17 ],
    [ 18, 19, 20, 21 ], [ 19, 20, 21, 22 ], [ 20, 21, 22, 23 ],
    [ 24, 25, 26, 27 ], [ 25, 26, 27, 28 ], [ 26, 27, 28, 29 ],
    [ 30, 31, 32, 33 ], [ 31, 32, 33, 34 ], [ 32, 33, 34, 35 ],
    [ 36, 37, 38, 39 ], [ 37, 38, 39, 40 ], [ 38, 39, 40, 41 ],
    // horizontal win conditions
    [  5, 11, 17, 23 ], [ 11, 17, 23, 29 ], [ 17, 23, 29, 35 ], 
    [ 23, 29, 35, 41 ], [  4, 10, 16, 22 ], [ 10, 16, 22, 28 ], 
    [ 16, 22, 28, 34 ], [ 22, 28, 34, 40 ], [  3,  9, 15, 21 ], 
    [  9, 15, 21, 27 ], [ 15, 21, 27, 33 ], [ 21, 27, 33, 39 ],
    [  2,  8, 14, 20 ], [  8, 14, 20, 26 ], [ 14, 20, 26, 32 ], 
    [ 20, 26, 32, 38 ], [  1,  7, 13, 19 ], [  7, 13, 19, 25 ], 
    [ 13, 19, 25, 31 ], [ 19, 25, 31, 37 ], [  0,  6, 12, 18 ], 
    [  6, 12, 18, 24 ], [ 12, 18, 24, 30 ], [ 18, 24, 30, 36 ],
    // diagonal up win conditions
    [  2,  9, 16, 23 ], [  1,  8, 15, 22 ], [  8, 15, 22, 29 ],
    [  0,  7, 14, 21 ], [  7, 14, 21, 28 ], [ 14, 21, 28, 35 ],
    [  6, 13, 20, 27 ], [ 13, 20, 27, 34 ], [ 20, 27, 34, 41 ],
    [ 12, 19, 26, 33 ], [ 19, 26, 33, 40 ], [ 18, 25, 32, 39 ],
    // diagonal down win conditions
    [  3,  8, 13, 18 ], [  4,  9, 14, 19 ], [  9, 14, 19, 24 ],
    [  5, 10, 15, 20 ], [ 10, 15, 20, 25 ], [ 15, 20, 25, 30 ],
    [ 11, 16, 21, 26 ], [ 16, 21, 26, 31 ], [ 21, 26, 31, 36 ],
    [ 17, 22, 27, 32 ], [ 22, 27, 32, 37 ], [ 23, 28, 33, 38 ]
];



// checks to see if a player has won the game
const checkForWin = () => {

    // with a little help from Ania Kubów https://www.youtube.com/watch?v=dBlSiGOFjUY
    // helped me understand how to check each board cell against each possible win condition

    // checks each winCondition to see if requirements are met for a win
    for ( let i = 0; i < winConditions.length; i++ ) {

        // targets the cells that need to be filled to meet winCondition[i]
        const checker1 = boardCells[ winConditions[ i ][ 0 ] ];
        const checker2 = boardCells[ winConditions[ i ][ 1 ] ];
        const checker3 = boardCells[ winConditions[ i ][ 2 ] ];
        const checker4 = boardCells[ winConditions[ i ][ 3 ] ];

        // if all four cells match player 1's checker color, player 1 wins 
        if ( $( checker1 ).hasClass( `${ player1.checkerColor }` ) && 
            $( checker2 ).hasClass( `${ player1.checkerColor }` ) && 
            $( checker3 ).hasClass( `${ player1.checkerColor }` ) && 
            $( checker4 ).hasClass( `${ player1.checkerColor }` ) ) {
            
            // increase player 1's win counter
            player1Wins ++;

            // notifies of winner
            alert( `${ player1.name } wins!` );

            // clears and updates board for new round
            clearBoard();

            // updates player 1's scoreboard
            $( 'div .player1 .score' ).empty().text( `${ player1Wins }` );
        
        // if all four cells match player 2's checker color, player 2 wins 
        } else if ( $( checker1 ).hasClass( `${ player2.checkerColor }` ) && 
            $( checker2 ).hasClass( `${ player2.checkerColor }` ) && 
            $( checker3 ).hasClass( `${ player2.checkerColor }` ) && 
            $( checker4 ).hasClass( `${ player2.checkerColor }` ) ) {

            // increase player 2's win counter
            player2Wins ++;

            // notifies of winner
            alert( `${ player2.name } wins!` );

            // clears and updates board for new round
            clearBoard();

            // updates player 2's scoreboard
            $( 'div .player2 .score' ).empty().text( `${ player2Wins }` );

        }
    }
};



////////////////
// AFTER LOAD //
////////////////


$( () => {


    // listens for the player to click a column 
    $( '.col' ).on( 'click' , ( event ) => {
        let cellTracker = 1; // tracks the cells that are filled in the column 
        let cellFilled = false; // allows a break in the loop when a cell is filled

        // places the players checker on event
        // while all of the cells are not filled, find the first cell that can be filled
        while ( cellTracker <= 6 && cellFilled === false ) {
            if ( $( event.currentTarget ).children( `.cell:nth-child( ${ cellTracker } )` ).hasClass( 'filled' ) ) {
                cellTracker ++; // cell is filled, check next cell
            } else {
                turn ++; // turn complete, add one

                // fill color based on player's turn
                if ( turn % 2 !== 0 ) {

                    // fills if player 1's choice
                    $( event.currentTarget ).children( `.cell:nth-child( ${ cellTracker } )` ).addClass( `${ player1.checkerColor } filled` );

                    // updates player's turn indicator
                    $( '.circle').removeClass( player1Checker ).addClass( player2Checker );
                    $( '.player-turn' ).empty().text( player2Turn );

                } else if ( turn % 2 === 0 ) {

                    // fills if player 2'z choice
                    $( event.currentTarget ).children( `.cell:nth-child( ${ cellTracker } )` ).addClass( `${ player2.checkerColor } filled` );
                    
                    // updates player's turn indicator
                    $( '.circle').removeClass( player2Checker ).addClass( player1Checker );
                    $( '.player-turn' ).empty().text( player1Turn );
                }

                cellFilled = true; // cell is now filled, exit loop

            }
        }

        // checks to see if a player has won
        checkForWin();

    } );


    // clears board when a player clicks "Clear Board" button
    $( 'button.clear-board' ).on( 'click' , ( ) => {
        clearBoard();
    } );


    // clears board and score when a player clicks "Clear Score" button
    $( 'button.clear-score' ).on( 'click', () => {
        clearBoard();
        clearScore();
    } ); 
    

} );
