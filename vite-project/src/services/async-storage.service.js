export const asyncStorageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType, delay = 700) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

async function get(entityType, entityId) {
    // try {
    //     const entities = await query(entityType)
    //     const entity = entities.find(entity => entity.__id === entityId)
    //     if (!entity) throw new Error(`Get failed, cannot find entity with _id: ${entityId} in: ${entityType}`)
    //     return entity
    // } catch (err) {
    //     console.log(err)
    // }

    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity._id === entityId)
        return entity
    })
}

function post(entityType, newEntity) {
    newEntity = { ...newEntity }
    newEntity._id = _makeId()
    return query(entityType).then(entities => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

function put(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const _idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (_idx < 0) throw new Error(`Update failed, cannot find entity with _id: ${entityId} in: ${entityType}`)
        entities.splice(_idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType, entityId) {
    console.log('entitytYPE',entityType)
    console.log('entityId',entityId)
    return query(entityType).then(entities => {
        const _idx = entities.findIndex(entity => entity._id === entityId)
        if (_idx < 0) throw new Error(`Remove failed, cannot find entity with _id: ${entityId} in: ${entityType}`)
        entities.splice(_idx, 1)
        _save(entityType, entities)
    })
}

// Private functions

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}