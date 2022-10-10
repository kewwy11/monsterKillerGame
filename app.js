function randomValue(min, max){
    return Math.floor(Math.random() * (max - min) + min)
}

const app = Vue.createApp({
    data(){
        return{
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },

    watch:{
        playerHealth(value){
            if(this.monsterHealth <= 0 && value <= 0){
                this.winner = 'Draw'
            }else if(value <= 0){
                this.winner = 'Monster'
            }
        },
        monsterHealth(value){
            if(this.playerHealth <= 0 && value <= 0){
                this.winner = 'Draw'
            }else if(value <= 0){
                this.winner = 'Player'
            }
        }
    },

computed:{
    monsterBarStyles(){
        if(this.monsterHealth < 0){
            return {width: '0%'}
        }
        return {width: this.monsterHealth + '%'};
    },
    playerBarStyles(){
        if(this.playerHealth < 0){
            return {width: '0%'}
        }
        return {width: this.playerHealth + '%'};
    },
    specialAttackRound(){
        return this.currentRound % 3 !== 0
    }
},

    methods:{
        restartGame(){
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.currentRound = 0,
            this.winner = null,
            this.logMessages = []
        },
        monsterAttack(){
            this.currentRound++;
            const attackValue = randomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessage('Player', 'attack', attackValue)
            this.playerAttack();
        },
        playerAttack(){
            const attackValue = randomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage('Monster', 'attack', attackValue)
        },
        specialAttack(){
            this.currentRound++;
            const attackValue = randomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('Player', 'Special-Attack', attackValue)
            this.playerAttack();
        },
        healPlayer(){
            this.currentRound++
            const healValue = randomValue(8, 20)
            this.addLogMessage('Player', 'Healed', healValue)
            if (this.playerHealth + healValue > 100){
                this.playerHealth = 100
            }else{
                this.playerHealth += healValue
            }
            this.playerAttack()
        },
        surrender(){
            this.winner = 'Monster'
        },
        addLogMessage(who, what, value){
            this.logMessages.unshift({
                Actionby: who,
                ActionType: what,
                ActionValue: value
            })
        }
    }
})

app.mount('#game');