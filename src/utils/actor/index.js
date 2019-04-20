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
    if(!pub && !priv) {
      /** 用于签名 */
      this.secret = ChainUtil.genKeyPair();
      /** 账户地址 */
      this.account = this.secret.getPublic().encode('hex');
    } else if(pub && priv) {
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
}

module.exports = Actor;
