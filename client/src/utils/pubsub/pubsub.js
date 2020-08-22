const pubsub = {
    _events: {},

    subscribe (eventName, fn) {
        const shouldCreateNewList = !this._events[eventName];

        if (shouldCreateNewList) {
            this._events[eventName] = [];
        }

        this._events[eventName].push(fn);
    },

    unsubscribe (eventName, fn) {
        const eventFns = this._events[eventName];

        if (eventFns) {
            this._events[eventName] = eventFns.filter(eventFn => eventFn !== fn);
        }
    },

    publish (eventName, data) {
        const eventFns = this._events[eventName];

        if (eventFns) {
            eventFns.forEach(eventFn => eventFn(data));
        }
    }
};

export default pubsub;
