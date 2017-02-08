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
        data () {
            return {
                greeting: 'hello'
            }
        }
    }
</script>

<style lang="sass">
    @import './index.scss';
</style>