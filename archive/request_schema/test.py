import datetime
import json
import os
from pprint import PrettyPrinter

import validators as val
from constants import (
    BEHAVIOR_ENUMS, CLOUD_COVERAGE_ENUMS, GENDER_ENUMS, SURVEY_TYPE_ENUMS,
    TRANSECT_ENUMS, WIND_SPEED_ENUMS)

SCHEMA = val.Schema({
    val.Required('user'): basestring,
    val.Required('exportTo'): val.List(basestring),
    val.Required('survey'): val.Dict({
        val.Required('type'): val.Any(*SURVEY_TYPE_ENUMS),
        val.Required('name'): basestring,
        val.Required('start'): val.Coerce(datetime.datetime),
        val.Required('end'): val.Coerce(datetime.datetime),
        val.Required('locationName'): basestring,
        val.Required('surveyorCount'): val.Coerce(int),
        val.Required('surveyorName'): basestring,
        val.Required('comment'): basestring,
        val.Required('habitatType'): basestring,
        val.Required('habitatCondition'): basestring,
        val.Required('surveyWeather'): val.Dict({
            val.Required('windSpeed'): val.Any(*WIND_SPEED_ENUMS),
            val.Required('radius'): val.Coerce(float),
            val.Required('cloudCoverage'): val.Any(*CLOUD_COVERAGE_ENUMS),
            val.Required('engagement'): val.Coerce(float),
            val.Required('temperature'): val.Coerce(float),
            val.Required('upload'): basestring,
            val.Required('transDiv'): basestring,
            val.Required('oHumidity'): val.Coerce(float),
            val.Required('oRain'): val.Coerce(float),
            val.Required('oPressure'): val.Coerce(float),
            val.Required('time'): val.Coerce(datetime.time),
            val.Required('oSnow'): val.Coerce(float),
            val.Required('oWindDir'): val.Coerce(float),
            val.Required('oWindSpeed'): val.Coerce(float),
            val.Required('oCity'): basestring,
            val.Required('oCountry'): basestring,
            val.Required('oCloudCover'): val.Coerce(float),
            val.Required('oMaxTemp'): val.Coerce(float),
            val.Required('oMinTemp'): val.Coerce(float),
            val.Required('oSunrise'): val.Coerce(datetime.time),
            val.Required('oSunset'): val.Coerce(datetime.time)
        }),
        val.Required('sightings'): val.List(
            val.Dict({
                val.Required('speciesCommon'): basestring,
                val.Required('speciesScientific'): basestring,
                val.Required('subfamilyCommon'): basestring,
                val.Required('subfamilyScientific'): basestring,
                val.Required('familyCommon'): basestring,
                val.Required('familyScientific'): basestring,
                val.Required('number'): val.Coerce(int),
                val.Required('time'): val.Coerce(datetime.datetime),
                val.Required('behavior'): val.Any(*BEHAVIOR_ENUMS),
                val.Required('gender'): val.Any(*GENDER_ENUMS),
                val.Required('condition'): basestring,
                val.Required('comment'): basestring,
                val.Required('transect'): val.Any(*TRANSECT_ENUMS),
                val.Required('wingLength'): val.Coerce(int),
                val.Required('markFound'): val.Boolean,
                val.Required('markAdded'): val.Boolean,
                val.Required('latitude'): val.Coerce(float),
                val.Required('longitude'): val.Coerce(float),
                val.Required('locationTime'): val.Coerce(datetime.time),
                val.Required('locationAccuracy'): val.Coerce(float),
                val.Required('point'): basestring,
                val.Required('weather'): val.Dict({
                    val.Required('temperature'): val.Coerce(float),
                    val.Required('windSpeed'): val.Coerce(float),
                    val.Required('windDirection'): val.Coerce(float),
                    val.Required('cloudCover'): val.Coerce(float),
                    val.Required('pressure'): val.Coerce(float),
                    val.Required('ambientTemperature'): val.Coerce(float),
                    val.Required('illuminance'): val.Coerce(float),
                    val.Required('relativeHumidity'): val.Coerce(float)
                })
            })
        ),
        val.Required('breadcrumbs'): val.List(val.Dict({
            val.Required('time'): val.Coerce(datetime.datetime),
            val.Required('latitude'): val.Coerce(float),
            val.Required('longitude'): val.Coerce(float),
            val.Required('accuracy'): val.Coerce(float),
            val.Required('speed'): val.Coerce(float)
        }))
    })
}, extra=False)


def validate(filepath):
    """
    Validate a json file against the schema.

    @param filepath: path to the json file
    @type  filepath: basestring
    @return: validated data
    @rtype: dict
    """
    with open(filepath, 'r') as f:
        data = f.read()

    query = json.loads(data)
    return SCHEMA(query)


def main():
    """
    Tester for the validate method.
    """
    filepath = os.path.join(os.path.dirname(__file__), 'test_data.json')
    validated_data = validate(filepath)

    pp = PrettyPrinter(indent=4)
    pp.pprint(validated_data)


if __name__ == '__main__':
    main()
