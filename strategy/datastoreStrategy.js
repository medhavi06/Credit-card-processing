class DatastoreStrategy {
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  getData() {
    return this.strategy.getData();
  }

  setData(data) {
    this.strategy.setData(data);
  }
}

export default DatastoreStrategy;
