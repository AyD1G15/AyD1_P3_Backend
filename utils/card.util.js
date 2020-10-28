const arrayValuesToDictionary = (arr) => {
    var result = {};
    for (var i = 0; i < arr.length; i++) {
        result[arr[i].id] = arr[i].total;
    }
    return result;
}

module.exports.populateValues = (items, values) => {
    const valuesAux = arrayValuesToDictionary(values);
    var items = items.map(item => {
        var availability = item.availability.map(id => {
            return {
                id: id,
                total: valuesAux[id]
            }
        })
        return {
            ...item,
            availability
        }
    })
    return items;
}

module.exports.arrayToObject = (arr) => {
    var result = {};
    for (var i = 0; i < arr.length; i++) {
        result[arr[i].id] = arr[i];
    }
    
    return result;
}