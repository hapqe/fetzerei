<script lang="ts">
    import { code } from "../stores";
</script>

{#if $code}
    <a class="absolute center screen bounce" href="{window.location.origin + '/r/' + $code}" target="_blank">
        <img alt="qr" src="https://api.qrserver.com/v1/create-qr-code/?size=500x500&data={window.location.origin + '/r/' + $code}"/>
    </a>
{/if}

<style>
    a {
        background-image: url('qr-frame.svg');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        animation-delay: 1.4s;
    }
    img {
        width: 46vh;
        height: 46vh;
        max-width: 46vw;
        max-height: 46vw;
    }
</style>