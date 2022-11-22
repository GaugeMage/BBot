// import nodeCanvas from 'canvas';
const nodeCanvas = require('canvas');

const images = {};

const pieces = ['wking', 'wqueen', 'wbishop', 'wknight',
    'wrook', 'wpawn', 'bking', 'bqueen', 'bbishop', 'bknight', 'brook', 'bpawn'];

const imagesToLoad = pieces.concat('board');

const fs = require('fs');


const loadImages = () => {
    let completed = 0;
    return new Promise(res => {
        imagesToLoad.forEach(name => {
            nodeCanvas.loadImage(`${__dirname}/images/${name}.png`).then(image => {
                images[name] = image;
                completed++;
                if (completed >= imagesToLoad.length) {
                    res(images);
                }
            });
        });
    });
};

loadImages()

exports.loadImages = loadImages;


exports.pieces = pieces;

exports.images = images;