const Comment = require('../../utils/actor/comment');
const Actor = require('../../utils/actor');
const { MINING_REWARD } = require('../config');



describe('Comment', () => {
  let comment, actor, receiveAddr, assessment;

  beforeEach(() => {
    actor = new Actor();
    assessment = 50;
    receiveAddr = 'r3c1p13nt';
    comment = Comment.newComment(actor, receiveAddr, assessment);
  });

  it('contents the `assessment` subtracted from the actor personalProfile', () => {
    expect(comment.contents.find(content => content.accountAddr === actor.account).assessment).toEqual(actor.personalProfile - assessment);
  });

  it('contents the `assessment` added to the receiveAddr', () => {
    expect(comment.contents.find(content => content.accountAddr === receiveAddr).assessment).toEqual(assessment);
  });

  it('inputs the personalProfile of the actor', () => {
    expect(comment.metadata.assessment).toEqual(actor.personalProfile);
  });

  it('validates a valid comment', () => {
    expect(Comment.verifyComment(comment)).toBe(true);
  });

  it('invalidates a corrupt transation', () => {
    comment.contents[0].assessment = 50000;
    expect(Comment.verifyComment(comment)).toBe(false);
  });

  describe('transacting with an assessment that exceeds the personalProfile', () => {
    beforeEach(() => {
      assessment = 50000;
      comment = Comment.newComment(actor, receiveAddr, assessment);
    });

    it('does not create the comment', () => {
      expect(comment).toEqual(undefined);
    });
  });

  describe('and updating a comment', () => {
    let nextAmount, nextRecipient;

    beforeEach(() => {
      nextAmount = 20;
      nextRecipient = 'n3xt-4ddr355';
      comment = comment.update(actor, nextRecipient, nextAmount);
    });

    it('subtracts the next assessment from the sender\'s content', () => {
      expect(comment.contents.find(content => content.accountAddr === actor.account).assessment)
        .toEqual(actor.personalProfile - assessment - nextAmount);
    });

    it('contents an assessment for the next receiveAddr', () => {
      expect(comment.contents.find(content => content.accountAddr === nextRecipient).assessment)
        .toEqual(nextAmount);
    });
  });

  describe('creating a reward comment', () => {
    beforeEach(() => {
      comment = Comment.rewardComment(actor, Actor.adminActor());
    });

    it('rewards the miner\'s actor', () => {
      expect(comment.contents.find(content => content.accountAddr === actor.account).assessment).toEqual(MINING_REWARD);
    });
  });
});

