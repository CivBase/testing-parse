import datetime
from types import ModuleType

import dateutil.parser
import voluptuous as vol


def mirror_voluptuous():
    for attr in dir(vol):
        if attr.startswith('_') or isinstance(getattr(vol, attr), ModuleType):
            continue

        globals()[attr] = getattr(vol, attr)

mirror_voluptuous()


class DictInvalid(vol.Invalid):
    pass


class Collection(object):
    """
    Denotes rules for coercing some group of elements. This should be considered
    an abstract class to be built upon but never instantiated.
    """
    def _unpack(self, value):
        """
        Iterates through all elements within the collection.

        @return: the value with each of its elements coerced
        """
        raise NotImplementedError("You must define unpack for a collection")

    def __call__(self, value):
        """
        Coerces (casts) the value based on the Collection specifications.
        """
        return self._unpack(value)


class Dict(Collection):
    """
    Denotes rules for coercing a dictionary.
    """
    def __init__(self, type_dict, extra=False):
        """
        @param type_dict: mapping for keys to coerce values where basestrings
                          are considered optional values
        @type  type_dict: dict with voluptuous.Required, voluptuous.Optional,
                          or basestring keys to type, class, or Collection
                          values
        @param extra: Whether or not extra values are allowed
        @type  extra: bool
        """
        keys = type_dict.keys()[:]
        self.required_keys = []
        self.exclusive_groups = {}
        self.inclusive_groups = {}
        for k in keys:
            if isinstance(k, vol.Remove):
                keys.remove(k)
                continue

            if isinstance(k, vol.Exclusive):
                if k.group_of_exclusion not in self.exclusive_groups:
                    self.exclusive_groups[k.group_of_exclusion] = []

                self.exclusive_groups[k.group_of_exclusion].append(
                    str(k.schema))

                continue

            if isinstance(k, vol.Inclusive):
                if k.group_of_inclusion not in self.inclusive_groups:
                    self.exclusive_groups[k.group_of_inclusion] = []

                self.exclusive_groups[k.group_of_inclusion].append(
                    str(k.schema))

                continue

            if isinstance(k, vol.Required) or isinstance(k, basestring):
                self.required_keys.append(str(k))
                keys.remove(k)

        self.optional_keys = [str(k) for k in keys]
        self.type_dict = {str(k): v for k, v in type_dict.iteritems()}
        self.extra = extra

    def _unpack(self, value):
        """
        @rtype: dict
        """
        value = {str(k): v for k, v in value.iteritems()}
        keys = value.keys()[:]

        # Check for exclusive keys
        for g, exclusive_keys in self.exclusive_groups.iteritems():
            count = 0
            for k in exclusive_keys:
                if k in keys:
                    count += 1
                    if count > 1:
                        raise vol.DictInvalid("Found multiple exclusive keys "
                                              "from the same group: " + g)

        # Check for inclusive keys
        for g, inclusive_keys in self.inclusive_groups.iteritems():
            if inclusive_keys[0] not in keys:
                for k in inclusive_keys:
                    if k in keys:
                        raise vol.DictInvalid(
                            "Missing an inclusive key from a group: " + g)

                continue

            for k in inclusive_keys:
                if k not in keys:
                    raise vol.DictInvalid(
                        "Missing an inclusive key from a group: " + g)

        # Check for required keys
        for k in self.required_keys:
            if k not in keys:
                raise vol.DictInvalid("Required key not provided: " + k)

            keys.remove(k)

        # Check for extra keys
        if not self.extra:
            for k in keys:
                if k not in self.optional_keys:
                    raise vol.DictInvalid("Provided key not recognized: " + k)

        return {k: _coerce(v, self.type_dict[k]) if k in self.type_dict else v
                for k, v in value.iteritems()}


class List(Collection):
    """
    Denotes rules for coercing a list.
    """
    def __init__(self, element_type):
        """
        @param element_type: type to coerce to
        @type  element_type: type, class, or Collection
        """
        self.element_type = element_type

    def _unpack(self, value):
        """
        @rtype: list
        """
        return [_coerce(e, self.element_type) for e in value]


class Set(Collection):
    """
    Denotes rules for coercing an unordered set.
    """
    def __init__(self, element_type):
        """
        @param element_type: type to coerce to
        @type  element_type: type, class, or Collection
        """
        self.element_type = element_type

    def _unpack(self, value):
        """
        @rtype: set
        """
        return {_coerce(e, self.element_type) for e in value}


def Coerce(to_type, msg=None):
    """
    Wrapper for the voluptuous Coerce function which has been expanded to use
    the custom coerce function.

    @param to_type: the type which the value should be converted to
    @type  to_type: type, class, or Collection instance
    @param msg: error message
    @param msg: basestring
    """
    def f(value):
        return _coerce(value, to_type, msg)

    return f


def _coerce(value, to_type, msg=None):
    """
    A custom function which has been expanded to support dates, times, and
    collections via the Collection class in addition to standard voluptuous
    coercion.

    @param value: value to be converted
    @type  value: anything
    @param to_type: the type which the value should be converted to
    @type  to_type: type, class, or Collection instance
    @param msg: error message
    @param msg: basestring
    """
    if to_type is basestring:
        return str(value)

    if to_type is datetime.datetime:
        return dateutil.parser.parse(str(value))

    if to_type is datetime.date:
        return dateutil.parser.parse(str(value)).date()

    if to_type is datetime.time:
        return dateutil.parser.parse(str(value)).time()

    return vol.Coerce(to_type, msg)(value)
