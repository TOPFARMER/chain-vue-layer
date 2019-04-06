const ChainUtil = require('..');
const Comment = require('./comment');

/**
 * 
 * 参与者：有资格获得区块链系统中，用于标识自身的公钥地址的用户
 * @class Actor
 * 
 */
class Actor {

  /**
   * 构建参与者的实例
   * @param {string} pub - 使用椭圆曲线加密生成的公钥，参与者的账户地址
   * @param {string} priv - 使用椭圆曲线加密生成，参与者的签名私钥
   * @memberof Actor
   */
  constructor(pub, priv) {
    if(!(pub && priv)) {
      /** 用于签名 */
      this.secret = ChainUtil.genKeyPair();
      /** 账户地址 */
      this.account = this.secret.getPublic().encode('hex');
    } else if(pub && (!priv)) {
      this.secret = ChainUtil.importPrivateKey(priv);
      this.account = pub;
    } else {
      this.secret = null;
      this.account = pub;
    }
  }

  /**
   *
   * 返回参与者的账户地址，用于DEBUG
   * @returns {string} 参与者的账户
   * @memberof Actor
   */
  toString() {
    return `Actor -
      account: ${this.account.toString()}`;
  }

  /**
   *
   *
   * @returns {string} 返回账户的密钥对
   * @memberof Actor
   */
  genSecret() {
    return JSON.stringify({
      publicKey: this.secret.getPublic().encode('hex'),
      privateKey: this.secret.getPrivate('hex')
    });
  }

  /**
   *
   * 对数据签名
   * @param {string} dataHash - 待签名的数据哈希
   * @returns {string} signatrue 即数字签名
   * @memberof Actor
   */
  sign(dataHash) {
    return this.secret.sign(dataHash);
  }
  
  /**
   * 
   * 新建一条评价并添加到评价池
   * @param {string} receiveAddr - 接受评价的账户地址（公钥）
   * @param {Obect} assessment - 教师评价内容
   * @param {CommentPool} commentPool - 本地同步的评价池
   * @returns {Obect} 返回一条评价
   * @memberof Actor
   */
  createComment(receiveAddr, assessment, commentPool) {
    if(!assessment) {
      //eslint-disable-next-line no-console
      console.log(`Comment content invalid`);
      return;
    }

    // 检查是否已经存在该条评价，如果有即更新/
    let comment = commentPool.existingComment(this.account);
    if(comment) {
      comment.update(this, receiveAddr, assessment);
    } else {
      comment = Comment.newComment(this, receiveAddr, assessment);
      commentPool.updateOrAddComment(comment);
    }
    return comment;
  }
  
  // 待完成
  checkCommentContent() {

  }
}

/**
 * 
 * 引用
 * @typedef { import('./comment-pool')} CommentPool
 * 
 */

module.exports = Actor;
