<script>
    new Image().src = 'bubbles/0.png'
</script>

<div class="screen absolute center">
    <div id="container">
        <x/>
        <x/>
        <x/>
    
        <x class="p3 bounce"/>
        <x/>
        <x class="p0 bounce"/>
    
        <x class="p1 bounce"/>
        <x/>
        <x class="p2 bounce"/>
    </div>
</div>

<style>
    #container {
        display: grid;
        grid-template-areas: 
            '. . .'
            'p3 . p0'
            'p1 . p2';
        width: 90%;
        height: 90%;
        margin-bottom: 5%;
        gap: 10%;
    }
    x {
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        padding: 10px;
    }
    .p0 {
        grid-area: p0;
        background-image: url('bubbles/0.png');
        animation: bounce .3s ease-in-out forwards;
        animation-delay: 3s;
    }
    .p1 {
        grid-area: p1;
        background-image: url('bubbles/1.png');
        animation: bounce .3s ease-in-out forwards;
        animation-delay: 3.5s;
    }
    .p2 {
        grid-area: p2;
        background-image: url('bubbles/2.png');
        animation: bounce .3s ease-in-out forwards;
        animation-delay: 4s;
    }
    .p3 {
        grid-area: p3;
        background-image: url('bubbles/3.png');
        animation: bounce .3s ease-in-out forwards;
        animation-delay: 4.2s;
    }
</style>