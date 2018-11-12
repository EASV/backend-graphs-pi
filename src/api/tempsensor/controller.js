import { success, notFound } from '../../services/response/'
import { Tempsensor } from '.'
var mqtt = require('mqtt')
var client = mqtt.connect({
  host: 'm20.cloudmqtt.com',
  port: 13758,
  username: 'pimate',
  password: 'Pimate123!'
})

client.on('connect', function () {
  client.subscribe('new-temp', function (err) {
    if (!err) {
      console.log('COONTAAACFTTTTT')
    }
  })
})

export const create = ({ bodymen: { body } }, res, next) =>
  Tempsensor.create(body)
    .then((tempsensor) => tempsensor.view(true))
    .then((tempsensor) => {
      console.log('trying')
      client.publish('new-temp', JSON.stringify(body))
      return tempsensor
    })
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Tempsensor.count(query)
    .then(count => Tempsensor.find(query, select, cursor)
      .then((tempsensors) => ({
        count,
        rows: tempsensors.map((tempsensor) => tempsensor.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Tempsensor.findById(params.id)
    .then(notFound(res))
    .then((tempsensor) => tempsensor ? tempsensor.view() : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Tempsensor.findById(params.id)
    .then(notFound(res))
    .then((tempsensor) => tempsensor ? tempsensor.remove() : null)
    .then(success(res, 204))
    .catch(next)
