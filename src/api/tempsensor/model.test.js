import { Tempsensor } from '.'

let tempsensor

beforeEach(async () => {
  tempsensor = await Tempsensor.create({ time: 'test', value: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = tempsensor.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tempsensor.id)
    expect(view.time).toBe(tempsensor.time)
    expect(view.value).toBe(tempsensor.value)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = tempsensor.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tempsensor.id)
    expect(view.time).toBe(tempsensor.time)
    expect(view.value).toBe(tempsensor.value)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
