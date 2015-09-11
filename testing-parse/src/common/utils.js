let extend = function(destination, source) {
    let out = {};
    for (let property in destination) {
        if (!destination.hasOwnProperty(property)) {
            continue;
        }
        out[property] = destination[property];
    }

    for (let property in source) {
        if (!source.hasOwnProperty(property)) {
            continue;
        }
        out[property] = source[property];
    }

    return out;
};

let getSelectedOptionById = function(id) {
    let e = document.getElementById('select-bar');
    return e.options[e.selectedIndex];
};

export {extend, getSelectedOptionById};
