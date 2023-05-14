<main class="screen absolute" />

<style>
    main {
        z-index: -10;
        background-image: url(grid.png);
        background-size: 40px;
        image-rendering: pixelated;
        transform: rotate(-45deg) scale(4);
        opacity: 0.04;

        animation: scroll 20s linear infinite;
    }

    @keyframes scroll {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 80px 40px;
        }
    }
</style>
