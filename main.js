document.querySelector(".control-buttons").onclick = function() {
    document.querySelector(".control-buttons").remove();
};
let duration = 800;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = [...blocksContainer.children];
let orderRange = Array.from(Array(blocks.length).keys());
orderRange.sort(() => 0.5 - Math.random());
console.log(orderRange);
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click', function() {
        flipBlock(block);
    });
});

function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    console.log(allFlippedBlocks.length);
    if (allFlippedBlocks.length === 2) {
        stopClicking();
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

function stopClicking() {
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}
let cardsWon = 0;

function checkMatchedBlocks(firstBlock, secondBlock) {
    if (firstBlock.dataset.set === secondBlock.dataset.set) {
        for (let i = 0; i <= 6; i++) {
            cardsWon++
        }
        if (cardsWon === 42) {
            setTimeout(() => {
                location.reload();
            }, 2500);
        }
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        document.getElementById('success').play();
    } else {
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
    }
}