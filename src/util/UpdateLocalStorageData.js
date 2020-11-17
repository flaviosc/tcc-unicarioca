const key = 'gameHistory';

export default class UpdateLocalStorageData {

    rankingArray;

    constructor(data){
        this.data = data;
    }

    getData() {
        return JSON.parse(localStorage.getItem(key));
    }

    setData() {
        this.rankingArray = this.getData();
        if(this.rankingArray == undefined || this.rankingArray == null) {
            localStorage.setItem(key, JSON.stringify([this.data]));
        } else {
            this.checkRecordExists();
        }
    }

    checkRecordExists(records) {
        const playerRankingIndex = this.rankingArray.findIndex(x => x.id === this.data.id);
        if(playerRankingIndex != -1) {
            this.rankingArray[playerRankingIndex] = this.data;
            localStorage.setItem(key, JSON.stringify(this.rankingArray))
        } else {
            if(this.rankingArray.length > 5) {
                this.rankingArray.shift();
            }
            this.rankingArray.push(this.data);
            localStorage.setItem(key, JSON.stringify(this.rankingArray))
        }
    }
}