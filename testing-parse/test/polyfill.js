if (typeof Function.prototype.bind !== 'function') {
    Function.prototype.bind = function bind(obj) {
        let args = Array.prototype.slice.call(arguments, 1);
        let self = this;
        let Nop = function() {};
        let bound = function() {
            return self.apply(
                this instanceof Nop ? this : (obj || {}), args.concat(
                    Array.prototype.slice.call(arguments)
                )
            );
        };

        Nop.prototype = this.prototype || {};
        bound.prototype = new Nop();
        return bound;
    };
}
