import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, destroy } from './controller'
import { schema } from './model'
export Tempsensor, { schema } from './model'

const router = new Router()
const { time, value } = schema.tree

/**
 * @api {post} /tempsensors Create tempsensor
 * @apiName CreateTempsensor
 * @apiGroup Tempsensor
 * @apiParam time Tempsensor's time.
 * @apiParam value Tempsensor's value.
 * @apiSuccess {Object} tempsensor Tempsensor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tempsensor not found.
 */
router.post('/',
  body({ time, value }),
  create)

/**
 * @api {get} /tempsensors Retrieve tempsensors
 * @apiName RetrieveTempsensors
 * @apiGroup Tempsensor
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of tempsensors.
 * @apiSuccess {Object[]} rows List of tempsensors.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /tempsensors/:id Retrieve tempsensor
 * @apiName RetrieveTempsensor
 * @apiGroup Tempsensor
 * @apiSuccess {Object} tempsensor Tempsensor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tempsensor not found.
 */
router.get('/:id',
  show)

/**
 * @api {delete} /tempsensors/:id Delete tempsensor
 * @apiName DeleteTempsensor
 * @apiGroup Tempsensor
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Tempsensor not found.
 */
router.delete('/:id',
  destroy)

export default router
