const key = 'gameHistory';

export default class UpdateLocalStorageData {

    rankingArray = [];

    constructor(data){
        this.data = data;
    }

    getData() {
        return JSON.parse(localStorage.getItem(key));
    }

    setData() {
        if(this.checkKeyExists() == false) {
            localStorage.setItem(key, JSON.stringify([this.data]))
        }

        if(this.checkKeyExists() == true) {
            this.rankingArray = this.getData();
            this.rankingArray.push(this.data);
            localStorage.setItem(key, JSON.stringify(this.rankingArray))
        }
    }

    updateData(){
        this.rankingArray = this.getData();
        const playerRankingIndex = this.rankingArray.findIndex(x => x.id === this.data.id);
        this.rankingArray[playerRankingIndex] = this.data;
        localStorage.setItem(key, JSON.stringify(this.rankingArray));
    }

    checkKeyExists() {
        if (this.getData() == null || this.getData() == undefined || this.getData().length !== 0) {
            return false;
        }

        return true;
    }
}