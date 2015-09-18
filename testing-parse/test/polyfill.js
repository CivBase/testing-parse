if (typeof Function.prototype.bind !== 'function') {
    Function.prototype.bind = function(obj) {
        const args = Array.prototype.slice.call(arguments, 1);
        const self = this;
        const Nop = function() {};
        const bound = function() {
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
