var MondaineClock = function (target) {
    this.paper = Snap(target);

    var group = this.paper.group();
    var clock;

    Snap.load("mondaine_clock.svg", function (loadedFragment) {
        clock = loadedFragment;
        group.append(loadedFragment);

        this.clock = clock;

        this.second_hand = this.clock.select("#second_hand");
        this.minute_hand = this.clock.select("#minute_hand");
        this.hour_hand = this.clock.select("#hour_hand");

        this.bbox = this.paper.select("#clock_face").getBBox();
        console.log(this.bbox);
        this.interval = setInterval(this.update.bind(this), 1000 / 60);
    }.bind(this));


}


MondaineClock.prototype.update = function () {
    var now = new Date();
    this.updateSecondHand(now.getSeconds() + now.getMilliseconds() / 1000.0);
    this.updateMinuteHand(now.getMinutes());
    this.updateHourHand(now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600);
}

MondaineClock.prototype.updateSecondHand = function (seconds) {
    var rotation = Math.min(seconds / 59, 1.0) * 360.0;
    var matrix = Snap.matrix();
    matrix.rotate(rotation, this.bbox.width / 2, this.bbox.height / 2);
    this.second_hand.transform(matrix);
}

MondaineClock.prototype.updateMinuteHand = function (minutes) {
    var rotation = minutes / 60.0 * 360.0;
    var matrix = Snap.matrix();
    matrix.rotate(rotation, this.bbox.width / 2, this.bbox.height / 2);
    this.minute_hand.transform(matrix);
}

MondaineClock.prototype.updateHourHand = function (hours) {
    var rotation = hours / 12.0 * 360.0;
    var matrix = Snap.matrix();
    matrix.rotate(rotation, this.bbox.width / 2, this.bbox.height / 2);
    this.hour_hand.transform(matrix);
}
