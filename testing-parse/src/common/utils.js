const extend = function(destination, source) {
    const out = {};
    for (const property in destination) {
        if (!destination.hasOwnProperty(property)) {
            continue;
        }
        out[property] = destination[property];
    }

    for (const property in source) {
        if (!source.hasOwnProperty(property)) {
            continue;
        }
        out[property] = source[property];
    }

    return out;
};

const getSelectedOptionById = function(id) {
    const e = document.getElementById(id);
    return e.options[e.selectedIndex];
};

export {extend, getSelectedOptionById};
