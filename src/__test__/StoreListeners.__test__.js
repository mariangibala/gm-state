'use strict'

import { EventsBus, Store } from '../index'

describe('Store listeners', () => {
  let EBus

  beforeEach(function() {
    EBus = EventsBus()
  })

  it('onListen init option works correct', function(done) {
    let calledA = 0
    let calledB = 0

    class AppStore extends Store {}
    const store = new AppStore(EBus)

    store.listen(function() {
      calledA++
    })

    store.listen(
      function() {
        calledB++
      },
      { init: false },
    )

    assert.equal(calledA, 1)
    assert.equal(calledB, 0)

    store.emitChange()

    assert.equal(calledA, 2)
    assert.equal(calledB, 1)

    done()
  })
})
