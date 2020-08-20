const pubsub = {
    events: {},

    subscribe: (eventName, fn) => {
        if (!pubsub.events[eventName]) {
            pubsub.events[eventName] = [];
        }

        pubsub.events[eventName].push(fn);
    },

    unsubscribe: (eventName, fn) => {
        if (pubsub.events[eventName]) {
            pubsub.events[eventName] = pubsub.events[eventName].filter(func => func !== fn);
        }
    },

    publish: (eventName, data) => {
        if (pubsub.events[eventName]) {
            pubsub.events[eventName].forEach(func => func(data));
        }
    }
};

export default pubsub;
