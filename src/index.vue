<template>
    <div id="app-4">
        {{greeting}}
        <img src="./images/1.gif" alt="">
        <img src="./images/2.png" alt="">
    </div>
</template>

<script>
    import './index.scss';
    export default {
        data: function(){
            return {
                greeting: 'hello'
            }
        }
    }
    setTimeout(() => {
        console.log(1)
    }, 1);
</script>

<style lang="sass">
    @import './index.scss';
</style>