const ChainUtil = require('..');
/**
 *
 * 评价
 * @class Comment
 */
class Comment {
  /**
   * 构造评价类实例
   * @memberof Comment
   */
  constructor() {
    /** 每条评价的唯一标识 */
    this.id = ChainUtil.id();
    /** 每条评价的元数据 */
    this.metadata = null;
    /** 每条评价的评价内容（针对对象不同的多条片段） */
    this.contents = [];
  }

  /**
   *
   * 对评价内容作出更改
   * @param {Actor} senderActor - 评价发起者
   * @param {string} receiveAddr - 被评价者
   * @param {Obect} assessment - 评价内容
   * @returns {Obect} 返回更改后的评价
   * @memberof Comment
   */
  update(senderActor, receiveAddr, assessment) {
    // 根据被评价者找出已存在的评价内容，若未创建，则新建内容；否则修改内容
    let existingContent = this.contents.find(content => content.receiveAddr === receiveAddr);
    if(!existingContent) {
      this.contents.push({ assessment, commitAddr: senderActor.account ,receiveAddr });
    } else {
      existingContent.assessment = assessment;
    }
    Comment.signComment(this, senderActor);
    return this;
  }

  /**
   *
   * 新建评价
   * @static 
   * @param {Actor} senderActor - 评价发起者
   * @param {string} receiveAddr - 被评价者
   * @param {Obect} assessment - 评价内容
   * @returns {Obect} 返回新建的评价
   * @memberof Comment
   */
  static newComment(senderActor, receiveAddr, assessment) {
    const comment = new this();
    comment.contents.push({ assessment, commitAddr: senderActor.account ,receiveAddr });
    Comment.signComment(comment, senderActor);
    return comment;
  }

  /**
   *
   * 对评价进行数字签名同时为其添加元数据
   * @static
   * @param {Obect} comment - 待签名的评价
   * @param {Actor} senderActor - 评价发起者
   * @memberof Comment
   */
  static signComment(comment, senderActor) {
    comment.metadata = {
      timestamp: Date.now(),
      commitAddr:senderActor.account,
      signature:senderActor.sign(ChainUtil.hash(comment.contents))
    };
  }


  /**
   *
   * 验证评价的数字签名
   * @static
   * @param {Obect} comment - 待验证的评价
   * @returns {boolean} 返回签名是否正确
   * @memberof Comment
   */
  static verifyComment(comment) {
    return ChainUtil.verifySignature(
      comment.metadata.commitAddr,
      comment.metadata.signature,
      ChainUtil.hash(comment.contents)
    );
  }
}

/**
 * 
 * 引用
 * @typedef { import('./index')} Actor
 * 
 */

module.exports = Comment;
