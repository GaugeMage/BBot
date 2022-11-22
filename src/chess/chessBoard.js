const fs = require('fs').promises;
// import nodeCanvas from 'canvas';
const nodeCanvas = require('canvas');

// import { makeSimpleErrorHandler } from './util.js';
const makeSimpleErrorHandler = require('./makeSimpleErrorHandler.js');
// import { images } from './images.js';
const images = require('./image.js').images;

let board;

const newBoard = () => {
    const board = [];
    const presetRows = {
        0: ['brook', 'bknight', 'bbishop', 'bqueen', 'bking', 'bbishop', 'bknight', 'brook'],
        1: ['bpawn', 'bpawn', 'bpawn', 'bpawn', 'bpawn', 'bpawn', 'bpawn', 'bpawn'],
        6: ['wpawn', 'wpawn', 'wpawn', 'wpawn', 'wpawn', 'wpawn', 'wpawn', 'wpawn'],
        7: ['wrook', 'wknight', 'wbishop', 'wqueen', 'wking', 'wbishop', 'wknight', 'wrook']
    };
    for (let y = 0; y < 8; y++) {
        board.push(presetRows[y] || Array.from({ length: 8 }));
    }
    return board;
};

const renderBoard = async () => {
    const width = 280;
    const height = 280;
    const boardXOffset = 24;
    const pieceSize = 32;

    const canvas = nodeCanvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    console.log(images);
    ctx.drawImage(images.board, 0, 0);

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            const image = images[board[y][x]];
            if (image) {
                ctx.drawImage(image, boardXOffset + pieceSize * x, pieceSize * y);
            }
        }
    }

    const buf = canvas.toBuffer('image/png', { compressionLevel: 9 });
    const fileName = Date.now() + '.png';
    await fs.writeFile(fileName, buf);
    return fileName;
};

const sendBoardImage = async (message, text) => {
    const boardImage = await renderBoard(board);
    await message.channel.send(text, {
        files: [{
            attachment: boardImage,
            name: boardImage
        }]
    }).catch(makeSimpleErrorHandler.run('Failed to send msg!'));
    fs.unlink(boardImage);
};

const saveBoard = () => {
    const json = JSON.stringify(board).replace(/],/g, '],\n').replace('[[', '[\n[').replace(']]', ']\n]');
    return fs.writeFile('state.json', json);
};

const chessState = {
    board,
    newBoard: () => {
        board = newBoard();
        chessState.board = board;
    },
    sendBoardImage,
    saveBoard,
    loadBoard: async () => {
        const data = await fs.readFile('./state.json', 'utf8').catch(() => {});
        if (data) {
            board = JSON.parse(data);
            chessState.board = board;
        }
    }
};

// export default chessState;

exports.chessState = chessState;