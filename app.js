function randomValue(min, max){
    return Math.floor(Math.random() * (max - min) + min)
}

const app = Vue.createApp({
    data(){
        return{
            playerHealth: 100,
            monsterHealth: 100
        }
    },

computed:{
    monsterBarStyles(){
        return {width: this.monsterHealth + '%'}
    },
    playerBarStyles(){
        return {width: this.playerHealth + '%'}
    }
},

    methods:{
        monsterAttack(){
            attackValue = randomValue(12, 5)
            this.monsterHealth -= attackValue
            this.playerAttack();
        },
        playerAttack(){
            attackValue = randomValue(15, 8)
            this.playerHealth -= attackValue
        } 
    }
})

app.mount('#game');