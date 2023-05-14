<script lang="ts">
    import Bubble from "./Bubble.svelte";
</script>

<main class="screen absolute center pointer-none">
    <div id="container">
        <x />
        <x />
        <x />

        <Bubble num={3} />
        <x />
        <Bubble num={0} />

        <Bubble num={1} />
        <x />
        <Bubble num={2} />
    </div>
</main>

<style>
    #container {
        display: grid;
        grid-template-areas:
            ". . ."
            "p3 . p0"
            "p1 . p2";
        width: 90%;
        height: 90%;
        margin-bottom: 5%;
        gap: 10%;
    }
    #container * {
        padding: 10px;
    }
</style>
