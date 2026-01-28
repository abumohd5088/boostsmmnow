
Only Short <7991927237abu1@gmail.com>
19:57 (0 minutes ago)
to me

const socketIO = require('socket.io');

module.exports = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);
        
        // Join user to their room
        socket.on('join-user-room', (userId) => {
            socket.join(`user-${userId}`);
        });
        
        // Join admin room
        socket.on('join-admin-room', () => {
            socket.join('admin-room');
        });

        // Handle order updates
        socket.on('order-update', (data) => {
            io.to(`user-${data.userId}`).emit('order-status-changed', data);
            io.to('admin-room').emit('new-order-update', data);
        });

        // Handle real-time stats
        socket.on('request-stats', async (userId) => {
            const stats = await getLiveStats(userId);
            socket.emit('live-stats', stats);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
};

