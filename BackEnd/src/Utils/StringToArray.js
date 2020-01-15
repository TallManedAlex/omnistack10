

module.exports = function StringToArray (ArrayAsString) {
    return ArrayAsString.split(`,`).map(techs => techs.trim());
    }