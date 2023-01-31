
class DatastoreStrategy{
    setStrategy (strategy) {
        this._strategy = strategy;
    }
    getData () {
        return this._strategy.getData();
    }
    setData (data) {
        this._strategy.setData(data);
    }

}
// const DatastoreStrategy = function () {
//     this.setStrategy = function (strategy) {
//         this._strategy = strategy;
//     }
//     this.getData = function () {
//         return this._strategy.getData();
//     }
//     this.setData = function (data) {
//         this._strategy.setData(data);
//     }
// }


module.exports = DatastoreStrategy;
