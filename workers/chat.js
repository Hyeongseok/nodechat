var client = require('../redis').client
,   log = require('../middleware/log')
;

var delta = 60 * 60 * 1000 * 3; // 3 hours, 10,800,000 ms
var interval = 60 * 60 * 1000 * 2; // 2 hours, 7,200,00 ms

function RemoveRooms() {
    log.debug({message: 'Removing Rooms', ts: Date.now()});
    client.zrangebyscore('rooms', '-inf', ((new Date).getTime() - delta), function(err, rooms) {
        if (err !== null) {
            log.error({
                message: 'Error in Remove Rooms', 
                err: err, 
                ts: Date.now()
            });
        } else {
            rooms.forEach(function(room) {
                client.multi()
                    .zrem('rooms', room)
                    .del('rooms:' + room + ':chats')
                    .exec();
            });
    }});
};

function CleanUpChatsFromRoom() {
    log.debug({message: 'Cleaning Up Chats', ts: Date.now()});
    client.zrange('rooms', 0, -1, function(err, rooms) {
        rooms.forEach(function(room) {
            client.zremrangebyscore('rooms:' + room + ':chats', '-inf', ((new Date).getTime() - delta));
        });
    });
};

function CleanUpUsers() {
    log.debug({message: 'Cleaning Up Users', ts: Date.now()});
    client.zrangebyscore('users', '-inf', ((new Date).getTime() - delta), function(err, users) {
        users.forEach(function(user) {
            client.multi()
                .zrem('users', user)
                .del('user:' + user)
                .del('user:' + user + ':room')
                .exec();
        });
    });
};

function CleanUp() {
    RemoveRooms();
    CleanUpChatsFromRoom();
    CleanUpUsers();
};

setInterval(CleanUp, interval);
CleanUp();