import {RootStore} from '../index'

jest.mock('comlink')
jest.mock('../../workers/getTimerWorker', () => ({
  getTimerWorker: () => require('../../workers/timer-worker').TimerWorker
}))
jest.mock('../../workers/timer-worker', () => ({
  TimerWorker: jest.fn(() => ({
    runTimer: async () => {}
  }))
}))
jest.mock('tone', () => ({
  start: jest.fn(),
  Synth: class Synth {
    toDestination() {
      return {
        triggerAttackRelease: () => {}
      }
    }
  }
}))

describe('createStore', () => {
  describe('new exercise', () => {
    let store: RootStore
    beforeAll(() => {
      store = new RootStore()
      store.exercise.changeExerciseTime(20)
    })

    describe('changeName()', () => {
      it('changes name of the new exercise', () => {
        store.exercise.changeName('test')
        expect(store.exercise.newExercise.name).toBe('test')
      })
    })
    describe('changeExerciseTime()', () => {
      it('changes the time of the new exercise', () => {
        expect(store.exercise.newExercise.exerciseTime).toBe(20)
      })

      it('changes the seconds left', () => {
        expect(store.exercise.newExercise.secondsLeft).toBe(20)
      })
    })
  })
})
