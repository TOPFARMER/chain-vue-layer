const Actor = require('../../utils/actor/index');
const CommentPool = require('./comment-pool');
const Blockchain = require('../blockchain');

describe('Actor', () => {
  let actor, cp, bc;

  beforeEach(() => {
    actor = new Actor();
    cp = new CommentPool();
    bc = new Blockchain();
  });

  describe('Create a comment', () => {
    let comment, receiveAddr, sendAccessment;

    beforeEach(() => {
      sendAccessment = { behave: 'good', evaluation: 'good', comment: 'keep going' };
      receiveAddr = 'r4nd0m-4ddr355';
      comment = actor.createComment(receiveAddr, sendAccessment, cp);
    });

    describe('and doing the same comment', () => {
      beforeEach(() => {
        actor.createComment(receiveAddr, sendAccessment, bc, cp);
      });

      it('doubles the `sendAccessment` subtracted from the actor personalProfile', () => {
        expect(comment.contents.find(content => content.accountAddr === actor.account).assessment)
          .toEqual(actor.personalProfile - sendAccessment * 2);
      });

      it('clones the `sendAccessment` content for the receiveAddr', () => {
        expect(comment.contents.filter(content => content.accountAddr === receiveAddr)
          .map(content => content.assessment)).toEqual([sendAccessment, sendAccessment]);
      });
    });
  });

  describe('calculatiing a personalProfile', () => {
    let addBalance, repeatAdd, senderActor;

    beforeEach(() => {
      senderActor = new Actor();
      addBalance = 100;
      repeatAdd = 3;

      for(let i=0; i<repeatAdd; i++) {
        senderActor.createComment(actor.account, addBalance, bc, cp);
      }
      bc.addBlock(cp.comments);
    });

    it('calculate the personalProfile for blockchain comments matching the receiveAddr', () => {
      //eslint-disable-next-line no-console
      console.log(`${actor.account}`);
      expect(actor.calculateBalance(bc)).toEqual(INITIAL_BALANCE + (addBalance * repeatAdd));
    });

    it('calculate the personalProfile for blockchain comments matching the sender', () => {
      expect(senderActor.calculateBalance(bc)).toEqual(INITIAL_BALANCE - (addBalance * repeatAdd));
    });

    describe('and the receiveAddr conducts a comment', () => {
      let subtractBalance, receiveAddrBalance;

      beforeEach(() => {
        cp.clear();
        subtractBalance = 60;
        receiveAddrBalance = actor.calculateBalance(bc);
        actor.createComment(senderActor.account, subtractBalance, bc, cp);
        bc.addBlock(cp.comments);
      });

      describe('and the sender sends another comment to teh receiveAddr', () => {
        beforeEach(() => {
          cp.clear();
          senderActor.createComment(actor.account, addBalance, bc, cp);
          bc.addBlock(cp.comments);
        });

        it('calculate the receiveAddr personalProfile only using comment since its most recent one', () => {
          expect(actor.calculateBalance(bc)).toEqual(receiveAddrBalance - subtractBalance + addBalance);
        });
      });
    });
  });


});