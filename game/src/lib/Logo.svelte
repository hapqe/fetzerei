<script lang="ts">
    import { onMount } from "svelte";

    let collapse = false;

    onMount(() => {
        setTimeout(() => {
            collapse = true;
        }, 1000);
    });
</script>

<div class='center screen absolute {collapse?"collapse":""}'>
    <img src="logo.png" alt="">
</div>

<style>
    div {
        flex-direction: column;
        transition: 1000ms ease-in-out;
    }

    .collapse img {
        transform: translateX(calc(-50vw + 25%)) translateY(calc(-50vh + 25%)) scale(.5);
    }

    img {
        height: 50vh;
        animation: logo .3s ease-in-out;
        transition: 1000ms;
    }

    @keyframes logo {
        0% {
            opacity: 0;
            transform: scale(1.3);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>