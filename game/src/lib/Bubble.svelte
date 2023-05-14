<script lang="ts">
    import { joined } from "../gameStores";

    let classes = "";

    $: if ($joined) {
        if ($joined[num] !== undefined)
            if ($joined[num]) {
                classes = "bounce";
            } else {
                classes = "unbounce";
            }
    }

    export let num: number;
</script>

<main class={classes} style="background-image: url('bubbles/{num}.png');" />

<style>
    main {
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        transform: scale(1);
        opacity: 0;
    }
</style>
