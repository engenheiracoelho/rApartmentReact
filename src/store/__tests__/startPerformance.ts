import {mocked} from 'ts-jest/utils'
import {speak} from '../../lib'
import {TimerWorker} from '../../workers/timer-worker'
import {RootStore} from '../index'

jest.mock('../../lib', () => ({
  speak: jest.fn()
}))
jest.mock('comlink', () => ({
  proxy: (item: any) => item
}))
jest.mock('../../workers/getTimerWorker', () => ({
  getTimerWorker: () => require('../../workers/timer-worker').TimerWorker
}))
jest.mock('../../workers/timer-worker', () => ({
  TimerWorker: jest.fn(() => ({
    clearInterval: jest.fn(),
    runTimer: jest.fn()
  }))
}))
jest.mock('tone', () => ({
  start: jest.fn(),
  Synth: class Synth {
    toDestination() {
      return {
        triggerAttackRelease: jest.fn()
      }
    }
  }
}))

describe('Timer', () => {
  let store: RootStore

  beforeAll(() => {
    store = new RootStore()
  })

  describe('startPerformance()', () => {
    it('initializes the worker', async () => {
      await store.timer.startPerformance()

      expect(store.timer.timerWorker).toBeDefined()
    })

    describe('spoken messages', () => {
      beforeAll(() => {
        jest.unmock('../../workers/timer-worker')
      })

      afterAll(() => {
        mocked(TimerWorker).mockRestore()
      })

      beforeEach(() => {
        mocked(speak).mockClear()
      })

      it('says a successful message in the end', async () => {
        store = new RootStore()
        store.round.addExercise()
        await store.timer.startPerformance()

        const calls = mocked(speak).mock.calls
        const { recoveryTime, name, exerciseTime } = store.exercise.newExercise

        expect(calls).toEqual([
          [`Get ready for ${exerciseTime} seconds of ${name}.`],
          [`Rest for ${recoveryTime} seconds.`],
          ['Congratulations! You completed your workout.']
        ])
      })
    })

    describe('synth sounds', () => {
      beforeAll(() => {
        jest.unmock('../../workers/timer-worker')
      })

      beforeEach(() => {
        mocked(store.timer.synth.triggerAttackRelease).mockClear()
      })

      afterAll(() => {
        mocked(TimerWorker).mockRestore()
      })

      it('plays a few synth sounds', async () => {
        store = new RootStore()
        store.round.addExercise()
        await store.timer.startPerformance()

        expect(store.timer.synth.triggerAttackRelease).toHaveBeenCalledTimes(24)
      })

      it('plays more synth sounds', async () => {
        store = new RootStore()
        store.round.addExercise()
        store.round.addExercise()
        await store.timer.startPerformance()

        expect(store.timer.synth.triggerAttackRelease).toHaveBeenCalledTimes(48)
      })
    })

    describe('when no exercise is added', () => {
      beforeAll(async () => {
        mocked(TimerWorker).mockClear()
        store.round.rounds.clear()
        store.timer.startPerformance()
        store.round.rounds.clear()
      })
      afterAll(async () => {
        await store.timer.stopPerformance()
      })
      it('does not create a new TimerWorker if already present', () => {
        expect(TimerWorker).toHaveBeenCalledTimes(0)
      })
    })

    describe('when at least one exercise is added', () => {
      beforeAll(async () => {
        store.round.addExercise()
        mocked(TimerWorker).mockClear()
        store.timer.startPerformance()
      })
      afterAll(async () => {
        await store.timer.stopPerformance()
      })
      it('does not create a new TimerWorker', () => {
        expect(TimerWorker).not.toHaveBeenCalled()
      })
    })

    describe('when there is a round with no exercises', () => {
      it('sets idle to false', async () => {
        store.round.rounds.clear()
        store.round.addExercise()
        store.round.rounds.get(1)!.exercises = []
        store.timer.startPerformance()

        expect(store.timer.idle).toBe(false)
      })
    })
  })
})
